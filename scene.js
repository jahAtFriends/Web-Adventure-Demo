/*
*
* Produced by the Quaker Advanced Technology Lab
* (c) 2022 Joel Hammer
* Friends School of Baltimore
* Department of Computer Science
*
*
*
* This code is distributed under the GNU GPL Licences v3.0
* For more information see https://www.gnu.org/licenses/gpl-3.0.html
*
*
* To include this code in your HTML project, use the url:
* http://webdev.quakerlabs.org/cyoa/scene.js
* 
* ...or download and host this file locally.
*
*/


/**
* Scene class is part of the Create Your Own Adventure Project
* for the course Web Design and Development.
* 
* Scenes are representations of each stage of a CYOA story. Each
* scene contains some html to be injected into a story page. They
* also contain links to two other possible scenes (left and right)
* depending on what is chosen at that stage of the story. For the
* technically inclined data structure enthusiast, this constitutes
* a (singly/unidirectional) linked list.
*
* To provide this class with access to your HTML files containing
* the visuals for the scene, you should set the base path to folder
* containing them. This can be done using the setDataPath() function
* (see below for more details). All HTML files must be in a single
* folder.
*
*
*
* @author Joel A. Hammer
*
*/
class Scene {
    static #data_path = "./"
    #left
    #right
    #html
    
    /**
    * Constructs a new Scene with the given properties. By default, a sample
    * HTML content will be inserted and left and right scenes are self-referential.
    *
    * @param {string} fileneame - The filename of the corresponding html file (relative
    * to the base-path of the Scene class)
    * @param {Scene} left - The Scene that will be progressed to by choosing the "left"
    * option on the current Scene. By default, each Scene is its own left scene.
    * @param {Scene} right - The Scene that will be progressed to by choosing the "right"
    * option on the current Scene. By default, each Scene is its own right scene.
    */
    constructor(filename, left, right) {
        var cb = 
        //Set the default html content, then try to import.
        this.#html = "<p>This is a Blank Scene! Use the method loadContent(url) to add html content.</p>";
        if (typeof filename === 'string')
            this.#loadHTMLFromURL(filename);
        
        this.#left = left !== undefined ? left : this;
        this.#right = right !== undefined ? right : this;
    }
    
    /**
    * Gets the scene that resulsts from the "left" option of the current
    * scene.
    *
    * @return {Scene} the Left Scene (as a scene object)
    */
    goLeft() {
        return this.#left;
    }
    
    /**
    * Gets the scene that resulsts from the "right" option of the current
    * scene.
    *
    * @return {Scene} the Right Scene (as a scene object)
    */
    goRight() {
        return this.#right;
    }
    
    /**
    * Sets the left scene of the current scene.
    *
    * @param {Scene} scene The Scene object to set as the left scene.
    */
    setLeftScene(scene) {
        this.#left = scene;
    }
    
    /**
    * Sets the right scene of the current scene.
    *
    * @param {Scene} scene The Scene object to set as the right scene.
    */
    setRightScene(scene) {
        this.#right = scene;
    }
    
    /**
    * Sets the global base path for hml scenes.
    * @param {string} url The url to base directory containing scenes.
    */
    static setDataPath(url) {
        Scene.#data_path = url !== undefined ? url : "./";
    }
    
    /**
    * Sets the html code for the scene.
    *
    * @param {string} html The HTML code for the scene.
    */
    setHTML(html) {
        this.#html = html;
    }
    
    /**
    * Gets the HTML from the current scene.
    *
    * @return {string} the HTML for the current scene.
    */
    getHTML() {
        return this.#html;
    }
    
    /*
    * Load the html data from the given (relative) url/filename.
    */
    #loadHTMLFromURL(url) {
        const absoluteURL = Scene.#data_path + url;
        var xhttp = new XMLHttpRequest();
        let me = this;
        
        xhttp.onload = function() {
            me.setHTML(this.responseText);
        }
        
        xhttp.open("GET", url);
        xhttp.send();
    }
}