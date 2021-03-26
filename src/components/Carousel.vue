<template>
    <div class="card-carousel">
      <ArrowButton
        id="left"
        arrowType="left"
        @click.native="showPrevElement"
        :disabled="this.reachedMaxLeft"
      />
      <Card
        class="current-element"
        :headline="currentElement.headline"
        :text="currentElement.text"
        :imgName="currentElement.imgName"
      />
      <ArrowButton
        id="right"
        arrowType="right"
        @click.native="showNextElement"
        :disabled="this.reachedMaxRight"
      />
      <Indicators
        :elements="this.cards"
        :currentElementIndex="this.currentElementIndex"
        :showElement="this.showElement"
      />
    </div>

</template>
<script>
import Card from "./Card.vue";
import ArrowButton from "./ArrowButton.vue";
import Indicators from "./Indicators.vue";

export default {
  name: "Carousel",
  props: { cards: Array },
  components: { Card, ArrowButton, Indicators },

  data() {
    return {
      currentElementIndex: 0,
				timeInterval: 5000,
				timerId: 0,
    };
  },
  computed: {
    currentElement() {
      return this.cards[this.currentElementIndex];
    },
    reachedMaxLeft() {
      return this.currentElementIndex === 0;
    },
    reachedMaxRight() {
      return this.currentElementIndex === this.cards.length - 1;
    }
  },
  methods: {
    showNextElement() {
      if(this.currentElementIndex === this.cards.length - 1){
        this.currentElementIndex = 0;
      }
      else{
      this.currentElementIndex++;
      }
    },
    showPrevElement() {
      if(this.currentElementIndex === 0){
        this.currentElementIndex = this.cards.length - 1;
      }
      else{
        this.currentElementIndex--;
      }
    },
    showElement(elementIndex) {
      this.currentElementIndex = elementIndex;
    }
  },
	created(){
		this.timerId = setInterval(() => {
      this.showNextElement()
		}, this.timeInterval);
	},
	beforeDestroy(){
		clearTimeout(this.timerId);
	}
};
</script>

<style src="../assets/styles/Carousel.css" scoped/>