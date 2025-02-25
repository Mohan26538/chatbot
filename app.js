document.addEventListener("DOMContentLoaded",function(){
    document.getElementById("send-btn").addEventListener("click",sendmessage);

});

document.getElementById("user-input").addEventListener("keypress",function(e){
    if(e.key == "Enter")
        sendmessage();
});

async function  sendmessage() {
    const userInput = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");

    if(!userInput.value.trim()) return;

    const userMessage = document.createElement("div");
    userMessage.classList.add("message","user");
    userMessage.textContent = userInput.value;
    chatBox.appendChild(userMessage);

    const userText = userInput.value;
    userInput.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;

    const response = await fetch("http://localhost:5000/chat",{
        method:"POST",
        headers:{"content-Type":"application/json"},
        body: JSON.stringify({message:userText}),
    });

    const data = await response.json();

    const botMessage = document.createElement("div");
    botMessage.classList.add("message","bot");
    botMessage.textContent=data.reply;
    chatBox.appendChild(botMessage);

    chatBox.scrollTop = chatBox.scrollHeight;

}