export default function capitalize(sentence:string) {
    if(!sentence) return sentence;
    return sentence.substring(0, 1).toUpperCase() + sentence.substring(1, sentence.length);
} 