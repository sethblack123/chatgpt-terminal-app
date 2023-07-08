import openai from "./open_ai.js"
import readlineSync from 'readline-sync';
import colors from 'colors';



async function main(){
const chatHistory=[];


while (true){
try{
  const userInput = readlineSync.question(colors.yellow("you: "))
const messages = chatHistory.map(([role,content])=> ({role, content}))
messages.push({role:"user", content: userInput})



const completion = await openai.createChatCompletion({
  model: "gpt-3.5-turbo",
  messages: messages,
});

//get response
const completionText = completion.data.choices[0].message.content;

if(userInput.toLocaleLowerCase()==='exit'){
    console.log(colors.green(`chat bot: ${completionText}`))
    return;
} else {
    console.log(colors.green(`chat bot: ${completionText}`))
    chatHistory.push(["user", userInput])
    chatHistory.push(["assistant", completionText])
}
}
catch(e){
    console.log(colors.red(e))}
}
}

main()
