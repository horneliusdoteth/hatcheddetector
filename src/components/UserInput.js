import React, { useState, useEffect }from "react";

const UserInput = ({ value, onChange, placeholder, onSubmit,}) => {
  const [isInputValid, setIsInputValid] = useState(true);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const regex = /^(1[0-4][0-9]{3}|15000|[1-9][0-9]{0,3})$/;
    const valid = regex.test(value) || value === "";
    setIsInputValid(valid);

  if (!valid && value !== "") {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000); // Hide toast after 3 seconds
    }
  }, [value]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (event.target.checkValidity()) {
      onSubmit();
    }
  };

  return (
    <div>
      <form
        style={{ display: "flex", alignItems: "center", }}
        onSubmit={handleSubmit}
      >
        <input 
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          pattern="^(1[0-4][0-9]{3}|15000|[1-9][0-9]{0,3})$"
          required
          onInvalid={(e) =>
            e.target.setCustomValidity("Between 1 and 15000")}
          onInput={(e) => e.target.setCustomValidity("")}
          style={{ marginRight: "10px" }}
        />
        <button type="submit" disabled={!isInputValid}>Submit</button>
      </form>
      {showToast && <div className="toast">Anon, input is invalid. Enter a number between 1 and 15000.</div>}
    </div>
  );
};

export default UserInput;
