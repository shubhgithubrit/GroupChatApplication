////////////////--------------------------------------//////////////////
//logout Scripting

var currentUser1=JSON.parse(localStorage.getItem("currentUser"));
if(currentUser1==null)
{
    window.location="./login.html";
}
