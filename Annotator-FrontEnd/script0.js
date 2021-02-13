var baseUrl = "http://localhost:8080";

var sendHttpRequest = (method,url,data)=>{
        const promise = new Promise((resolve, reject)=>{
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("Accept", "application/json");
            xhr.responseType = 'json'
            xhr.onload = ()=>{
                resolve(xhr.response);
            };
            if(data){
                xhr.send(JSON.stringify(data));
            }else{
                xhr.send();
            }
        });
        return promise;
    }

document.querySelector("#signInButton"),addEventListener("click", function(event){
    if(event.target.id =="signInButton"){
        console.log(event.target)
        var userName = document.getElementById("name").value;
        document.getElementById("name").value="";
        var password = document.getElementById("password").value;
        document.getElementById("password").value="";
        console.log("################################################");
        
        var jwt ;
        var role;
        if(userName!=null && password!=null){
            sendHttpRequest("POST",baseUrl+"/authenticate", {
                "userName":userName,
                "password":password
            }).then(responseData =>{
                var data = responseData;
                console.log(data);
                jwt = data.jwt;
                role = data.role;
                console.log(jwt);
                console.log(role);
                localStorage.setItem("theJWT" ,jwt);
                localStorage.setItem("BI_USERNAME",userName);
                if(role == "User" && jwt && jwt!="undefined"){
                    location.href = "index1.html"
                }else if(role == "Admin" && jwt && jwt!="undefined"){
                    location.href = "index2.html"
                }
            });
        };
        
    }

});

