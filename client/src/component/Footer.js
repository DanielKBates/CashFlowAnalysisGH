import React from "react";

const styles = {
    style: {
        backgroundColor: "grey",
        borderTop: "1px solid #000000",
        textAlign: "center",
        padding: "20px",
        position: "fixed",
        left: "0",
        bottom: "0",
        height: "10%",
        width: "100%",
    },
    phantom: {
        display: 'block',
        padding: '20px',
        height: '60px',
        width: '100%',
    }
}


function Footer() {
    return (
        <div className="mt-2">
            <div style={styles.phantom} />
            <div style={styles.style}>
                <span>©Daniel Bates & Stephen Fanale 2020</span>
            </div>
        </div>
    )
}

export default Footer