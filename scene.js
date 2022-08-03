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
* To include this code in your HTML project, use the following html code:
* <script type="text/javascript" src="https://jahatfriends.github.io/Web-Adventure-Demo/scene.js"></script>
* 
* 
* ...or download and host this file locally.
*
*/


/**
* <em>The Scene class is part of the Create Your Own Adventure Project
* for the course Web Design and Development.</em>
* <br/><br/>
* A "Create Your Own Adventure" story is, essentially, a collection
* of individual <em> Scenes </em>. There is some initial scene which
* branches off into 2 possible subsequent scenes, depending on the user's
* selection. From this new scene, two more choices are presented so that
* there are a variety of paths through the story which can be traversed
* depending on the selections made.
* <br/>
* <br/>
*
* This class deines an object which represents the scenes of a CYOA story.
* Each scene contains some html to be injected into a story page. They
* also contain references to two other possible scenes (termed left and right)
* that can be selected by the user.
*
* To create the HTML code for a given scene, you should first save each scene
* as an HTML file (omitting the <code>&lt;html&gt;, &lt;head&gt;, and &lt;body&gt;</code>
* tags). Ensure that <em>all</em> scene files are in the same directory. This is
* known as the "base" or "data" directory in this class, and it is uniform
* accross <em> all </em> Scene objects. To set the base directory, use the
* command:
* <br/>
* <br/>
* <code> Scene.setDataPath("path-to-scene-html-files"); </code>
* <br/>
* <br/>
* It is recommended to use <em>relative</em> paths. In this case, we mean relative
* to the file into which this script is being imported. By default the base-path
* is "./" which is suitable if the scene html files are in the same directory
* as the importing html file.
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
    * Callback to perform any action when the scene is finished loading.
    * @callback onLoadCallback
    */
    
    /**
    * Constructs a new Scene with the given properties. By default, a sample
    * HTML content will be inserted and left and right scenes are self-referential.
    * <br/>
    * <br/>
    * See examples below. Note that HTML content is loaded into the scene <em>asyncrounously</em>,
    * so that it is possible that the a call to display the first scene will occur <em>before</em>
    * that scene has finished loading. This will result in the display of the incorrect (default)
    * html text. See example 2 for more specifics.
    * To avoid this, consider displaying the first scene after the user clicks a button.
    * For most scenes, this will provide plenty of delay to ensure loading completes.
    * Otherwise, it is supported to display the first scene when it has fully loaded using
    * a callback function. See example 3 for details.
    *
    * @param {string} [fileneame] - The filename of the corresponding html file (relative
    * to the base-path of the Scene class)
    * @param {Scene} [left=this] - The Scene that will be progressed to by choosing the "left"
    * option on the current Scene. By default, each Scene is its own left scene.
    * @param {Scene} [right=this] - The Scene that will be progressed to by choosing the "right"
    * option on the current Scene. By default, each Scene is its own right scene.
    * @param {onLoadCallback} [cb] - A function to run when the HTML file is fully loaded.
    *
    * @example <caption> Example 1: Creating a mini-story</caption>
    * //Creates a 3 Scene story
    * let scene3 = new Scene("scene3.html"); //By default, this scene links back to itself
    * let scene2 = new Scene("scene2.html"); //This scene also has two self-links
    * let scene1 = new Scene("scene1.html", scene2, scene3);
    *
    * @example <caption> Example 2: Caution with importation </caption>
    * //Likely to result in example html although the import succeeded.
    * let scene1 = new Scene("scene1.html", scene2, scene3);
    * document.getElementById.innerHTML = scene1.getHTML(); //Runs before html load completes
    *
    * @example <caption> Example 3: Callback to handle first scene </caption>
    *
    * let cb = function() {
    *   document.getElementById.innerHTML = scene1.getHTML();
    * }
    * let scene1 = new Scene("scene1.html", scene2, scene3, cb); //Ensures display occurs after html loads.
    */
    constructor(filename, left = this, right = this, cb = () => undefined) {
        //Set the default html content, then try to import.
        this.#html = "<p>This is a Blank Scene! Use the method loadContent(url) to add html content.</p>";
        if (typeof filename === 'string')
            this.#loadHTMLFromURL(filename, cb);
        
        this.#left = left;
        this.#right = right;
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
    * Load the html data from the given (relative) url/filename, then performs
    * the given callback
    */
    #loadHTMLFromURL(url, cb) {
        //Ignore invalid callbacks.
        cb = typeof cb === 'function' ? cb : () => undefined;
        
        const absoluteURL = Scene.#data_path + url;
        var xhttp = new XMLHttpRequest();
        let me = this;
        
        xhttp.onload = function() {
            me.setHTML(this.responseText);
            cb();
        }
        
        xhttp.open("GET", url);
        xhttp.send();
    }
}