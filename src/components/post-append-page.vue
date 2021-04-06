<template>
  <div class="editor">
    <h1 v-show="error" class="error__message">
      공백을 제외하고 제목을 반드시 입력해주세요 (맨앞뒤의 공백은 제거됩니다.)
    </h1>
    <div class="title__box">
      <label for="title" class="label__title">제목</label>
      <input type="text" name="title" id="title" v-model="inputTitle" placeholder="제목을 입력하세요" />
    </div>
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
      <div class="menubar">
         <button
          class="menubar__button"
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
        >
          <i class="fa fa-bold"></i>
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic"
        >
          <i class="fa fa-italic"></i>
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.strike() }"
          @click="commands.strike"
        >
          <i class="fa fa-strikethrough"></i>
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.underline() }"
          @click="commands.underline"
        >
          <i class="fa fa-underline"></i>
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.paragraph() }"
          @click="commands.paragraph"
        >
          <i class="fa fa-paragraph"></i>
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 1 }) }"
          @click="commands.heading({ level: 1 })"
        >
          H1
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })"
        >
          H2
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })"
        >
          H3
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.bullet_list() }"
          @click="commands.bullet_list"
        >
          <i class="fa fa-list-ul"></i>
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.ordered_list() }"
          @click="commands.ordered_list"
        >
          <i class="fa fa-list-ol"></i>
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.blockquote() }"
          @click="commands.blockquote"
        >
          <i class="fa fa-quote-right"></i>
        </button>

        <button
          class="menubar__button"
          @click="commands.undo"
        >
          <i class="fa fa-undo"></i>
        </button>

        <button
          class="menubar__button"
          @click="commands.redo"
        >
          <i class="fa fa-redo"></i>
        </button>
      </div>
    </editor-menu-bar>

    <editor-content class="editor__content" id="content" :editor="editor" />
    <button type="submit" v-on:click="sendPost" class="upload__button">
      <span class="upload__button__text">
        업로드
      </span>
    </button>
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  HardBreak,
  Heading,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  Image,
} from 'tiptap-extensions'
export default {
  components: {
    EditorContent,
    EditorMenuBar,
  },
  data() {
    return {
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new BulletList(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Bold(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
          new Image(),
        ],
        content: `
          <h2>
            Images
          </h2>
          <p>
            This is basic example of implementing images. Try to drop new images here. Reordering also works.
          </p>
        `,
      }),
      inputTitle: "",
      error: null,
    }
  },
  methods: {
    showImagePrompt(command) {
      const src = prompt('Enter the url of your image here')
      if (src !== null) {
        command({ src })
      }
    },
    sendPost() {
	    let form = document.createElement('form');
    
	    form.setAttribute('method', 'post');
    
	    form.setAttribute('action', "api/post");
    
      
	  	let title = document.createElement('input');
  
	  	title.setAttribute('type', 'hidden');
  
	  	title.setAttribute('name', "title");
  
	  	title.setAttribute('value', document.getElementById("title").value);
  
	  	form.appendChild(title);
      
	  	let content = document.createElement('input');
  
	  	content.setAttribute('type', 'hidden');
  
	  	content.setAttribute('name', "contents");
  
	  	content.setAttribute('value', document.getElementById("content").innerHTML);
  
	  	form.appendChild(content);
    
	    document.body.appendChild(form);

      if(this.inputTitle.trim() === ""){
        this.error = "제목없음"
      } else {
	      form.submit();
      }
    }
  },
}
</script>

<style>
.editor{
  background: white;
  padding: 3%;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.error__message{
  font-size: 1rem;
  color: red;
  text-align: center;
}
.title__box{
  display: flex;
  margin: 10px 0px;
  width: 100%;
}
#title{
  width: 100%;
  height: 6vh;
  font-size: 1.5rem;
}
.label__title{
  font-size: 2rem;
  width: 100px;
}
.editor__content > div > p > img{
  max-width: 100%;
}
.menubar{
  margin: 3vh 0;
}
.menubar__button{
  border-radius: 100%;
  cursor: pointer;
  border: 1px solid navy;
  margin: 0 0.5vw;
}
.menubar__button:hover{
  background-color: teal;
  color: wheat;
}
.ProseMirror{
  border: 2px solid black;
  width: 80vw;
}
.upload__button{
  position: relative;
  width: 150px;
  height: 75px;
  border: 1px solid plum;
  border-radius: 10%;
  background: white;
  cursor: pointer;
  overflow: hidden;
  margin: 5%;
}
.upload__button::after{
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: plum;
  transform: scale(0, 1);
  transition: all 0.35s;
}
.upload__button:hover::after{
  transform: scale(1, 1);
}
.upload__button__text{
  position: relative;
  z-index: 2;
  color: plum;
  transition: all 0.35s;
  font-weight: bold;
  font-size: 1.5rem;
}
.upload__button:hover .upload__button__text{
  color: white;
}

</style>