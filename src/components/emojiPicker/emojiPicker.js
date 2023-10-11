import { forwardRef, useEffect, useRef, useState } from "react";
import { data as emojiList } from "./data";
import EmojiButton from "./emojiButton";
import EmojiSearch from "./emojiSearch";
import styles from "./emojiPicker.module.scss";


export function EmojiPicker(props, inputRef) {
    const [isOpen, setIsOpen] = useState(false);
    const [emojis, setEmojis] = useState([...emojiList]);
    const containerRef = useRef(null);

    useEffect(()=> {
        window.addEventListener("click", (e)=> {
            if (!containerRef.current.contains(e.target)) { //si damos click a un elemento padre de emojis ejecutamos cierto codigo
                setIsOpen(false);
                setEmojis(emojiList);
            }
        })
    }, []);

        function handleClickOpen(){
            setIsOpen(!isOpen); // render on/off
        }
        
        function handleSearch(e){
            const q = e;
            
            if( !!q ) {
                const search = emojiList.filter((emoji) => {
                    return (
                        emoji.name.toLowerCase().includes(q) || 
                        emoji.keywords.toLocaleLowerCase().includes(q)
                    );
                });

                setEmojis(search);
                } else {
                    setEmojis(emojiList);
                }
        }
        function handleOnClickEmoji(emoji){
            const cursorPosition = inputRef.current.selectionStart; // me va a dar la posicion del cursor con useReff
            const text = inputRef.current.value;
            const prev = text.slice(0, cursorPosition);
            const next = text.slice(cursorPosition);

            inputRef.current.value = prev + emoji.symbol + next ;
            inputRef.current.selectionStart = cursorPosition + emoji.symbol.length;
            inputRef.current.selectionEnd = cursorPosition + emoji.symbol.length;
            inputRef.current.focus();
        }

        
    return (
        <div ref={containerRef} className={styles.inputContainer}>
            <button onClick={handleClickOpen} className={styles.emojiPickerButton}> 😀 </button>

            {isOpen ? (
            <div className={styles.emojiPickerContainer}>
                <EmojiSearch onSearch={handleSearch} />
                <div className={styles.emojiList}>
                    {emojis.map((emoji) => (
                    < EmojiButton key={emoji.symbol} emoji={emoji} onClick={handleOnClickEmoji}/>
                    ))}
                </div>
            </div>
        ) : (
            ""
            )}
        </div>
    );
}

export default forwardRef(EmojiPicker);