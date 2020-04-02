import React from 'react';

const Inventory = () => {

    const handleAddInventory = () => {
        console.log("Clicked");
    }
    return (
        <div>
            <h2>Developer is Sleeping....</h2>
            <button onClick={handleAddInventory}>Add Inventory</button>
        </div>
    );
};

export default Inventory;