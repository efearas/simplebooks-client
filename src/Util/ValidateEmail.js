export function validateEmail(email) 
{
    var re2 = /^\S+@\S+$/ ;
    return re2.test(email);
}