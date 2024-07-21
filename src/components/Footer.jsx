import React from 'react';


function Footer() {

    const styles = {
        footer:{
            backdropColor:'#34495e',
            color:'white',
            padding:'20px 0',
            textAlign:'center',
        },
        text:{
            margin: 0,
            fontSize: '1rem',
        },
    };

    return (
       <footer style={styles.footer}>
           <p style={styles.text}>
               © 2024 Báo Tin Tức Người Lao Động. All rights reserved.
           </p>
       </footer>
    );
}

export default Footer;