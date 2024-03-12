import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Navbar from '@/pages/Admincomponent/Navbaradmin';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import styles from '@/styles/manageAccess.module.css';
import { collection, addDoc, query, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';



export default function ManageUser() {
  const [confirmDeleteItem, setConfirmDeleteItem] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false); // เพิ่ม state สำหรับการแสดงฟอร์มเพิ่มข้อมูล
  const [newItem, setNewItem] = useState({ name: '', email: '', studentId: '', department: '', faculty: '', classGroup: '' });
  const handleEdit = (item) => {
    // โค้ดที่ต้องการให้ทำเมื่อคลิกที่ไอคอนแก้ไข
    setSelectedItem(item); // เลือกไอเท็มที่ต้องการแก้ไข
  };



  // Add Database
  const addItem = async (e) => {
    e.preventDefault();
    if (newItem.name !== '' && newItem.email !== '' && newItem.department !== '' && newItem.faculty !== '' && newItem.classGroup !== '') {
      const duplicateEmail = items.some(item => item.email === newItem.email);
      if (duplicateEmail) {
        alert('อีเมลนี้ได้ถูกใช้งานอยู่แล้ว');
        return;
      }

      // const duplicateStudentId = items.some(item => item.studentId === newItem.studentId);
      // if (duplicateStudentId) {
      //   alert('รหัสนักศึกษานี้ได้ถูกใช้งานอยู่แล้ว');
      //   return;
      // }
      // ตรวจสอบว่าอีเมลถูกต้องหรือไม่
      if (!newItem.email.endsWith('@lru.ac.th')) {
        alert('กรุณาใส่อีเมลของมหาวิทยาลัย');
        return;
      }
      // ตรวจสอบว่ารหัสนักศึกษามีจำนวนตัวเลข 10 ตัว
      // if (!/^\d{10}$/.test(newItem.studentId)) {
      //   alert('กรุณาใส่รหัสนักศึกษาให้ครบ');
      //   return; // ไม่ทำขั้นตอนถัดไปหากรหัสนักศึกษาไม่ถูกต้อง
      // }
      await addDoc(collection(db, 'Admin'), {
        name: newItem.name.trim(),
        email: newItem.email.trim(),
        studentId: newItem.studentId,
        department: newItem.department,
        faculty: newItem.faculty,
        classGroup: newItem.classGroup
      });
      setNewItem({
        name: '',
        email: '',
        studentId: '',
        department: '',
        faculty: '',
        classGroup: '',
      });
      setShowForm(false); // ปิดฟอร์มหลังจากเพิ่มข้อมูล
    }
  };

  // Read Database
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'Admin'), (querySnapshot) => {
      let itemsArr = [];
      querySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id });
      });
      setItems(itemsArr);
    });
    return () => unsubscribe();
  }, []);

  // Delete Database
  const deleteUser = async (item) => {
    if (confirmDeleteItem !== item) {
      console.error('Invalid item to delete:', item);
      return;
    }

    console.log('DB:', db);
    await deleteDoc(doc(db, 'Admin', item.id));
    setConfirmDeleteItem(null); // เมื่อลบสำเร็จให้ล้าง confirmDeleteItem
  };


  // Edit Database
  const updateItem = async () => {
    if (selectedItem) {
      const { id, ...rest } = selectedItem;
      // เพิ่มการตรวจสอบรหัสนักศึกษา
      // if (!/^\d{10}$/.test(rest.studentId)) {
      //   alert('กรุณาใส่รหัสนักศึกษาให้ครบ');
      //   return;
      // }
      await updateDoc(doc(db, 'Admin', id), rest);
      setSelectedItem(null); // เมื่ออัปเดตเสร็จสิ้น ให้ล้างข้อมูลที่ถูกเลือก
    }
  };

  // Handle search
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <>
      <Head>
        <title>จัดการข้อมูลผู้ดูแลระบบ</title>
      </Head>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.h1}>จัดการข้อมูลผู้ดูแลระบบ</h1>
        <div className={styles.search}>
          <div >
            <button onClick={() => setShowForm(!showForm)} className={styles.addIcon} >+ เพิ่มข้อมูลผู้ดูแลระบบ</button>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="ค้นหารายชื่อผู้ดูเเลระบบ"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          {showForm && (
            <div className={styles.modalOverlay}>
              <div className={styles.modalContent}>
                <form onSubmit={addItem} className={styles.userForm}>
                  <h2 className={styles.h1}>เพิ่มผู้ดูเเลระบบ</h2>
                  <input
                    value={newItem.email}
                    onChange={(e) => setNewItem({ ...newItem, email: e.target.value })}
                    className={styles.dataadmin}
                    name="email"
                    required placeholder="อีเมลนักศึกษา" />
                  <input value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} className={styles.dataadmin} name="name" required placeholder="ชื่อ-นามสกุล"
                  />
                  <input
                    value={newItem.studentId}
                    onChange={(e) => setNewItem({ ...newItem, studentId: e.target.value })}
                    className={styles.dataadmin}
                    name="studentId"
                    required placeholder="รหัสนักศึกษา"
                  />
                  <input
                    value={newItem.faculty}
                    onChange={(e) => setNewItem({ ...newItem, faculty: e.target.value })}
                    className={styles.dataadmin} name="faculty"
                    required placeholder="คณะ"
                  />
                  <input
                    value={newItem.department}
                    onChange={(e) => setNewItem({ ...newItem, department: e.target.value })}
                    className={styles.dataadmin}
                    name="department"
                    required placeholder="สาขา"
                  />
                  <input
                    value={newItem.classGroup}
                    onChange={(e) => setNewItem({ ...newItem, classGroup: e.target.value })}
                    className={styles.dataadmin}
                    name="classGroup"
                    required placeholder="หมู่เรียน"
                  />
                  <button type="submit" className={styles.addButton}>เพิ่มข้อมูล</button>
                  <button type="button" onClick={() => setShowForm(false)} className={styles.cancelButton}>ยกเลิก</button>
                </form>
              </div>
            </div>
          )}

          {selectedItem && (
            <div className={styles.modalOverlay}>
              <div className={styles.modalContent}>
                <form className={styles.userForm}>
                  <h2 className={styles.h1}>แก้ไขข้อมูลผู้ดูเเลระบบ</h2>
                  <input
                    value={selectedItem.name}
                    onChange={(e) => setSelectedItem({ ...selectedItem, name: e.target.value })}
                    className={styles.dataadmin}
                    name="name"
                    required placeholder="ชื่อ-นามสกุล"
                  />
                  <input
                    value={selectedItem.studentId}
                    onChange={(e) => setSelectedItem({ ...selectedItem, studentId: e.target.value })}
                    className={styles.dataadmin}
                    name="studentId"
                    required placeholder="รหัสนักศึกษา"
                  />
                  <input
                    value={selectedItem.email}
                    onChange={(e) => setSelectedItem({ ...selectedItem, email: e.target.value })}
                    className={styles.dataadmin}
                    name="email"
                    required placeholder="อีเมลนักศึกษา"
                  />
                  <input
                    value={selectedItem.department}
                    onChange={(e) => setSelectedItem({ ...selectedItem, department: e.target.value })}
                    className={styles.dataadmin}
                    name="department"
                    required placeholder="สาขา"
                  />
                  <input
                    value={selectedItem.faculty}
                    onChange={(e) => setSelectedItem({ ...selectedItem, faculty: e.target.value })}
                    className={styles.dataadmin}
                    name="faculty"
                    required placeholder="คณะ"
                  />
                  <input
                    value={selectedItem.classGroup}
                    onChange={(e) => setSelectedItem({ ...selectedItem, classGroup: e.target.value })}
                    className={styles.dataadmin}
                    name="classGroup"
                    required placeholder="หมู่เรียน"
                  />
                  <button type="button" onClick={updateItem} className={styles.addButton}>บันทึก</button>
                  <button type="button" onClick={() => setSelectedItem(null)} className={styles.cancelButton}>ยกเลิก</button>
                </form>
              </div>
            </div>
          )}
          {confirmDeleteItem && (
            <div className={styles.modalOverlay}>
              <div className={styles.modalContent} style={{ width: '25%',height:'19%' }}>
                <p style={{fontSize:'15px'}}>คุณต้องการลบผู้ดูแลระบบนี้หรือไม่?</p>
                <p style={{fontSize:'10px'}}>ถ้าลบเเล้วข้อมูลจะหายไปอย่างถาวร</p>
                <div className={styles.confirmButtons}>
                  <button style={{fontSize:'13px',width:'90px',height:'30px',borderRadius:'4px'}} onClick={() => setConfirmDeleteItem(null)}>ยกเลิก</button>
                  <button className={styles.confirmdelete} style={{textAlign:'center',fontSize:'13px',width:'90px',height:'30px',borderRadius:'4px'}} onClick={() => deleteUser(confirmDeleteItem)}>ยืนยัน</button>
                </div>
              </div>
            </div>
          )}
          <table className={styles.userTable}>
            <thead>
              <tr>
                <th>ชื่อ-นามสกุล</th>
                {/* <th>รหัสนักศึกษา</th> */}
                <th>อีเมลนักศึกษา</th>
                <th>สาขา</th>
                <th>คณะ</th>
                <th>หมู่เรียน</th>
                {/* <th>สถานะ</th> */}
                <th>เเก้ไข</th>
                <th>ลบ</th>

              </tr>
            </thead>
            <tbody>
              {filteredItems.map(item => (
                <tr className={styles.userRow} key={item.id}>
                  <td>{item.name}</td>
                  {/* <td>{item.studentId}</td> */}
                  <td>{item.email}</td>
                  <td>{item.department}</td>
                  <td>{item.faculty}</td>
                  <td>{item.classGroup}</td>
                  {/* <td>{item.status}</td> */}

                  <td >
                    <button className={styles.editIcon} onClick={() => handleEdit(item)}><FiEdit /></button>
                  </td>
                  <td>
                  <button className={styles.deleteIcon} onClick={() => setConfirmDeleteItem(item)}><FiTrash2 /></button>
                  </td>
                  {/* switch */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
