const jwt = require('jsonwebtoken');

// decode, verify, generate

const value = {
    name: "annamalai",
    accountNumber: 2749271039
}

// jwt

const token = jwt.sign(value, 'secret'); //cheque book generator the bank has is this secret_text which can be used for verify also
console.log(token);

//this token has been generated using this secret, and hence this token can only be verified with this secret

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYW5uYW1hbGFpIiwiYWNjb3VudE51bWJlciI6Mjc0OTI3MTAzOSwiaWF0IjoxNzI4MTk4Mjg0fQ.0zHXaO0UgCCRv_kPdbiN4kV8UOhZlPDj3uDTlTzpXdo
//this long string can be decoded by anyone without any secret it is the cheque book generator itself
//this secret string even if changed gives the same output for value object
//but if you change the value object then the token also changes
// go to jwt.io and give this token, it will give the contents

//they can know the contents of the cheque book using this token and create a similar one
// but without the secret they can't sign and get the same level of access as the user/bank
// the original server won't verify it, as their secret is different, it can't sign successfully

const tokenVerified = jwt.verify(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYW5uYW1hbGFpIiwiYWNjb3VudE51bWJlciI6Mjc0OTI3MTAzOSwiaWF0IjoxNzI4MTk4Mjg0fQ.0zHXaO0UgCCRv_kPdbiN4kV8UOhZlPDj3uDTlTzpXdo"
, 'secret');//if different secret then JsonWebTokenError: invalid signature
console.log(tokenVerified);



