export function whereAmI() {
    if(window.origin.indexOf('https://app')==0){
        return "prod";
    }
    if(window.origin.indexOf('https://testapp')==0){
        return "test";
    }
    if(window.origin.indexOf('http://local')==0){
        return "local";
    }
}