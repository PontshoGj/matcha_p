class InputValidator {

     //check if the input is not empty
     checkInput (input) {
        if (input === '' || input === null)
            return 0;
        return 1;
    }

    checkObject (input) {
        if (input == '' && input.length >= 3)
            return 0;
        return 1;
    }

}
module.exports = InputValidator