import React from 'react';

const UserInput = ({ value, onChange, placeholder, onSubmit }) => {

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission
        if (event.target.checkValidity()) {
          onSubmit(); // If the form is valid, call the onSubmit prop
        }
      };

    return (
        <form style={{ display: 'flex', alignItems: 'center' }} onSubmit={handleSubmit}>
            <input
                type='text'
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                pattern='^(1[0-4][0-9]{3}|15000|[1-9][0-9]{0,3})$'
                required
                onInvalid={(e) => e.target.setCustomValidity('Between 1 and 15000')}
                onInput={(e) => e.target.setCustomValidity('')}
                style={{ marginRight: '10px' }}
            />
            <button onClick={onSubmit}>Submit</button>
        </form>
    );
}

export default UserInput;