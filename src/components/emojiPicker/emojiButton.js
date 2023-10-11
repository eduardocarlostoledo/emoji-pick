import styles from "./emojiPicker.module.scss"

export default function EmojiButton ({emoji, onClick}){
    
    function handleOnClick() {
        onClick(emoji);
    }
    return <button className={styles.emojiButton} onClick={handleOnClick}>{emoji.symbol}</button>;
}