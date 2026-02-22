/**
 * 📋 Jugaad Form Validator - Indian Style!
 *
 * India mein form bharna ek art hai! College admission ka form validate
 * karna hai. Har field ke apne rules hain. Tujhe ek errors object return
 * karna hai jisme galat fields ke error messages hain. Agar sab sahi hai
 * toh empty errors object aur isValid = true.
 *
 * formData object:
 *   { name, email, phone, age, pincode, state, agreeTerms }
 *
 * Validation Rules:
 *   1. name: must be a non-empty trimmed string, min 2 chars, max 50 chars
 *      Error: "Name must be 2-50 characters"
 *
 *   2. email: must be a string containing exactly one "@" and at least one "."
 *      after the "@". Use indexOf(), lastIndexOf(), includes().
 *      Error: "Invalid email format"
 *
 *   3. phone: must be a string of exactly 10 digits, starting with 6, 7, 8, or 9
 *      (Indian mobile numbers). Check each char is a digit.
 *      Error: "Invalid Indian phone number"
 *
 *   4. age: must be a number between 16 and 100 inclusive, and an integer.
 *      JUGAAD: Agar string mein number diya hai (e.g., "22"), toh parseInt()
 *      se convert karo. Agar convert nahi ho paya (isNaN), toh error.
 *      Error: "Age must be an integer between 16 and 100"
 *
 *   5. pincode: must be a string of exactly 6 digits, NOT starting with "0"
 *      Error: "Invalid Indian pincode"
 *
 *   6. state: Use optional chaining (?.) and nullish coalescing (??) -
 *      if state is null/undefined, treat as "". Must be a non-empty string.
 *      Error: "State is required"
 *
 *   7. agreeTerms: must be truthy (Boolean(agreeTerms) === true).
 *      Falsy values: 0, "", null, undefined, NaN, false
 *      Error: "Must agree to terms"
 *
 * Return:
 *   { isValid: boolean, errors: { fieldName: "error message", ... } }
 *   - isValid is true ONLY when errors object has zero keys
 *
 * Hint: Use typeof, Boolean(), parseInt(), isNaN(), Number.isInteger(),
 *   ?. (optional chaining), ?? (nullish coalescing), Object.keys(),
 *   startsWith(), trim(), length
 *
 * @param {object} formData - Form fields to validate
 * @returns {{ isValid: boolean, errors: object }}
 *
 * @example
 *   validateForm({
 *     name: "Rahul Sharma", email: "rahul@gmail.com", phone: "9876543210",
 *     age: 20, pincode: "400001", state: "Maharashtra", agreeTerms: true
 *   })
 *   // => { isValid: true, errors: {} }
 *
 *   validateForm({
 *     name: "", email: "bad-email", phone: "12345", age: 10,
 *     pincode: "0123", state: null, agreeTerms: false
 *   })
 *   // => { isValid: false, errors: { name: "...", email: "...", ... } }
 */
export function validateForm(formData) {
  const errors = {};
  if (!formData || typeof formData !== "object") {
    return { isValid: false, errors: { form: "Invalid form data" } };
  }
  const name = formData.name?.trim() ?? ''
  if (name.length < 2 || name.length > 50) {
    errors.name = "Name must be 2-50 characters"
  }
  const email = formData.email ?? ''
  const atIndex = email.indexOf("@")
  const lastIndexOf = email.lastIndexOf("@")
  const dotOfIndex = email.indexOf(".", atIndex)
  if (typeof email !== "string" || atIndex <= 0 || atIndex !== lastIndexOf || dotOfIndex === -1) {
    errors.email = "Invalid email format"
  }
  const phone = formData.phone ?? '';
  let isValidPhone = typeof phone === 'string' && phone.length === 10;
  if (isValidPhone && !"6789".includes(phone[0])) {
    isValidPhone = false
  }
  for (let index = 0; index < phone.length && isValidPhone; index++) {
    if(phone[index] < "0" || phone[index] > "9"){
      isValidPhone = false
    }
  }
  if (!isValidPhone) {
    errors.phone = "Invalid Indian phone number"
  }
  let age = formData.age ?? ''
  if(typeof age === "string"){
    age = parseInt(age)
  }
  if(isNaN(age) || age < 16 || age > 100 || !Number.isInteger(age)){
    errors.age = "Age must be an integer between 16 and 100"
  }
  const pinCode = formData.pincode ?? ''
  let isValidPinCode = typeof pinCode === "string" && pinCode.length === 6 && !pinCode.startsWith('0')
  for (let index = 0; index < pinCode.length && isValidPinCode; index++) {
      if (pinCode[index] < '0' || pinCode[index] > "9") {
        isValidPinCode = false
      }    
  }
  if (!isValidPinCode) {
    errors.pincode = "Invalid Indian pincode"
  }
  const state = formData?.state?.trim() ?? ''
  if (!state) {
    errors.state = "State is required"
  }
  if (!Boolean(formData.agreeTerms)) {
    errors.agreeTerms = "Must agree to terms"
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}
