import { useEffect, useState } from "react";

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState('');
  const [enteredNameIsValid,setEnteredNameIsValid] = useState(false);
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {                  //this is useful when we have more form fields to validate
    if (enteredNameIsValid) {        // so if any of the validation fails we just disables the button (in button tag we use in built js thing DISABLED )
      setFormIsValid(true)
    } else {
      setFormIsValid(false);
    }
  }, [enteredNameIsValid]);

  const nameInputChangeHandler = event => {
    setEnteredName(event.target.value);
    if (event.target.value.trim() !== '') {
      setEnteredNameIsValid(true); 
    } 
  };

  const nameInputBlurHandler = (event) =>{ // this functions looks if the input field is touched
    setEnteredNameTouched(true);
    if (enteredName.trim() === '') {
      setEnteredNameIsValid(false); 
    } 
  };
 

  const formSubmissionHandler = event => {
    event.preventDefault();
    setEnteredNameTouched(true);
    if (enteredName.trim() === '') {
      setEnteredNameIsValid(false);
      return;
    } 
    setEnteredNameIsValid(true);
    setEnteredName('');
  };
   
   const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched; 

   const nameInputClasse = nameInputIsInvalid ? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasse}>
        <label htmlFor='name'>Your Name</label>
        <input 
                type='text' 
                id='name' 
                onChange={nameInputChangeHandler} 
                onBlur={nameInputBlurHandler}
                value={enteredName} 
                />
                {nameInputIsInvalid && <p className="error-text">Name must not be EMPTY</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;


