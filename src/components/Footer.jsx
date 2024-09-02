import React from 'react';

import "./stylecomp.css"

const Footer = () => {
  return (
    <footer 
// @ts-ignore
    style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.balance}>
          <span style={styles.number}>{" "} 12345 </span>
          
          <span>{" "} : إجمالي اليوم </span>
        </div>
        <button className="footer-button" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        <i className="fa-solid fa-file-circle-plus fa-lg" style={{ bottom:"3px", position:"relative"}}></i>
           {" "}
           إضافة 
          </button>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
    backgroundColor: '#2c3e50', // لون أزرق داكن يتناسب مع الموقع
    color: '#ecf0f1', // لون النص أبيض مائل للرمادي الفاتح
    textAlign: 'center',
    padding: '8px 0',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px',
  },
  balance: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '16px', // حجم خط أصغر للمحصلة والرقم
    color: '#ecf0f1', // لون النص أبيض مائل للرمادي الفاتح
  },
  number: {
    fontSize: '18px', // حجم خط أكبر قليلاً للرقم لجعله يبرز
    fontWeight: 'bold',
    color: '#f39c12', // لون برتقالي يتناسب مع الموقع
    marginRight: '4px', // مسافة صغيرة بين "المحصلة" والرقم
  },
};

export default Footer;
