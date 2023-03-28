<!-- <template>
  
  <textarea v-model="textarea"></textarea>
  <button @click="Submit">Enter</button>

  <div v-for="item in input_text" :key="item.id">
    <div>{{item.choices[0].text }}</div>
  </div>

</template> -->
<template>
   <NavMenu @setPage="setPage" />
  <div id="app">
    <div class="chat-container" style="z-index: 1;">
      <div class="chat-header">
        <h2>GPT-3 Chat</h2>
      </div>
      <div class="messages">
        <div v-for="(message, index) in messages" :key="index" class="message-wrapper">

          <div class="message" :class="message.sender" v-if="message.is_waiting === false">
            <div class="message-content">
              {{message.text }}
            </div>
            <div class="message-timestamp">
              {{message.timestamp }}
            </div>
          </div>

          <div v-else class="message">
            <div class="message-content">
              {{message.text }} <b>.</b><b>.</b><b>.</b>
            </div>
          </div>

        </div>
      </div>
      <form @submit.prevent="Submit" class="input-form">
        <input type="text" v-model="inputMessage" placeholder="Type your message..." />
        <button type="submit">Send</button>
      </form>
    </div>
  </div>
</template>

<script>
import { openai } from '@/hooks/openai';
import NavMenu from './NavMenu.vue';
export default {
    name: "TextOpenAI",
    data() {
        return {
          inputMessage: "",
          messages: []
        };
    },
    mounted() {
    },
    methods: {
        formatTimestamp(date) {
          const hours = date.getHours().toString().padStart(2, '0');
          const minutes = date.getMinutes().toString().padStart(2, '0');
          return `${hours}:${minutes}`;
        },
        setPage(page){
         this.$emit('setPage',page)
        },
        Submit() {
            (async () => {
               
              
                let self = this;
                if (self.inputMessage.trim() !== '') {
                  self.messages.push({
                    sender: 'user',
                    text: self.inputMessage,
                    timestamp: self.formatTimestamp(new Date()),
                    is_waiting:false
                  });

                  self.messages.push({
                    sender: 'bot',
                    text: "Loading",
                    is_waiting:true,
                  })

             
                  const gptResponse = await openai.complete({
                    engine: "text-davinci-003",
                    prompt: self.inputMessage,
                    maxTokens: 900,
                    temperature: 0.5,
                });
                self.messages.pop()
                  self.messages.push({
                    sender: 'bot',
                    text: gptResponse.data.choices[0].text,
                    timestamp: self.formatTimestamp(new Date()),
                    is_waiting:false
                  });
                  self.inputMessage = '';
                }


            })();
        }
    },
    components: { NavMenu }
}
</script>


<style scoped>
body {
  margin: 0;
  padding: 0;
  font-family: 'Arial', sans-serif;
  height: 100%;
}

#app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.chat-container {
  width: 100%;
  max-width: 600px;
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.chat-header {
  text-align: center;
  margin-bottom: 20px;
}

.messages {
  max-height: 400px;
  overflow-y: auto;
  padding: 10px;
  margin-bottom: 10px;
}

.message-wrapper {
  margin-bottom: 10px;
  clear: both;
}

.message {
  padding: 8px 12px;
  border-radius: 5px;
  display: inline-block;
  max-width: 80%;
  word-wrap: break-word;
  position: relative;
}

.user {
  background-color: #2196f3;
  color: #ffffff;
  float: right;
}

.bot {
  background-color: #e8e8e8;
  color: #000000;
  float: left;
}

.message-content {
  padding: 6px 12px;
  border-radius: 5px;
}

.message-timestamp {
  font-size: 10px;
  position: absolute;
  bottom: -18px;
  right: 5px;
  color: rgba(0, 0, 0, 0.5);
}

.input-form {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  padding: 5px;
  border-radius: 5px;
}

input {
  flex-grow: 1;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: none;
  outline: none;
}

button {
  margin-left: 5px;
  padding: 8px 16px;
  font-size: 16px;
  background-color: #2196f3;
  color: #ffffff;
  border: none;
  border-radius:5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #1868bf;
}
@keyframes dots {
  25% {
    transform: translateY(5%);
  }
  50% {
    transform: translateY(-15%);
  }
  75% {
    transform: translateY(5%);
  }

}
b {
  transform: translateY(5%);
  display: inline-block;
  animation: dots 1.2s linear infinite;
}
b:nth-child(2) {
  animation-delay: 0.2s;
}
b:nth-child(3) {
  animation-delay: 0.4s;
}
</style>
