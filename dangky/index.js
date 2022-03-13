let signUpform = document.getElementById("signUpForm")

let users = []
let usersFromLocal =JSON.parse(localStorage.getItem("users"))  
if(usersFromLocal){
    users = usersFromLocal
}

signUpform.onsubmit = (e) =>{
    e.preventDefault()

    setTextErr("#emailErr", "")
    setTextErr("#passwordErr", "")
    setTextErr("#confirmPasswordErr", "")

    let email = signUpform.email.value
    let password = signUpform.password.value
    let confirmPassword = signUpform.confirmPassword.value

    let validate = true

    if(!email){
        setTextErr("#emailErr", "Email is required")
        validate = false
    }
    if(!password){
        setTextErr("#passwordErr", "Password is required")
        validate = false
    }
    if(!confirmPassword){
        setTextErr("#confirmPasswordErr", "Confirm Password is required")
        validate = false
    }

    if(password.length <6){
        setTextErr("#passwordErr", "Password must be at least 6 characters") 
        validate = false 
    }else{
        if(confirmPassword != password){
            setTextErr("#confirmPasswordErr", "Password does not match")
            validate = false
        }
    }

    if(validate){
        let user = {
            email: email,
            password: password
        }
        users.push(user)
        localStorage.setItem("users", JSON.stringify(users))
        sweetAlert("success", "Sign up successfully!")

        setTimeout(()=>{
            open("../index.html", "_self")
        },3000)
    }
}

let setTextErr = (query, content) =>{
    document.querySelector(query).innerHTML = content
}


let sweetAlert = (icon, content)=>{
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: icon,
        title: content
      })
}