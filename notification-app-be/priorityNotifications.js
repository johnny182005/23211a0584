const axios=require("axios");
require("dotenv").config();
const TOKEN=process.env.TOKEN;

function getPriority(type){

    switch(type){
        case "Placement":
            return 3;
        case "Result":
            return 2;
        default:
            return 1;
    }
}
async function getTopNotifications(){
    try{
        const response=await axios.get(
            "http://4.224.186.213/evaluation-service/notifications",
            {
                headers:{
                    Authorization:`Bearer ${TOKEN}`
                }
            }
        );
        let notifications=Array.isArray(response.data)?response.data:response.data.notifications||[];
        notifications.sort((a,b)=>{
            const priorityDiff=getPriority(b.Type)-getPriority(a.Type);
            if(priorityDiff!==0)
                return priorityDiff;
            return new Date(b.Timestamp)-new Date(a.Timestamp);
        });
        const to=notifications.slice(0,10);
        console.log("\nTop 10 Notifications\n");
        to.forEach((n,index)=>{
            console.log(
                `${index+1}. ${n.Type} | ${n.Message} | ${n.Timestamp}`
            );
        });
    }catch(err){
        console.log("Error:");
        console.log(err.response?.data||err.message);
    }
}
getTopNotifications();