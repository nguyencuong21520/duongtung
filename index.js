let formSignIn = document.getElementById("signInForm");

let users = [];

let usersList = JSON.parse(localStorage.getItem("users"));
if (usersList) {
  users = usersList;
}

console.log(usersList);

formSignIn.onsubmit = (e) => {
  e.preventDefault();

  setTextErr("#emailErr", "");
  setTextErr("#passwordErr", "");

  let valid = true;

  let email = formSignIn.email.value;
  let password = formSignIn.password.value;

  if (!email) {
    setTextErr("#emailErr", "Email is required");
    valid = false;
  }
  if (!password) {
    setTextErr("#passwordErr", "Password is required");
    valid = false;
  }
  if (valid) {
    let success = false;
    for (let i = 0; i < users.length; i++) {
      if (email == users[i].email && password == users[i].password) {
        showElm()
        success = true;
        break;
      }
    }
    if(success == false) {
        sweetAlert("error","Email or password is incorrect")
    }
  }
};

let setTextErr = (query, content) => {
  document.querySelector(query).innerHTML = content;
};


let showElm = () =>{
    // cls.array.forEach(element => {
    //     document.querySelector(cls).classList.add("showAll");
    // });

    let hideElm = document.querySelectorAll(".hide")
    hideElm.forEach(element => {
        element.classList.remove("hide")
    });
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