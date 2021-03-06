# Wheel of Fortune!
---

![Wheel](https://pmcdeadline2.files.wordpress.com/2012/10/wheeloffortune__121029164437.jpg)


 A simple "Wheel of Fortune" type game as my first GA WDI assignment.

[Link to the Game](jonnycakes.github.io/wheel-of-fortune/)

[Find the Presentation Here](https://docs.google.com/presentation/d/1EYfGA-3EHHJKsKT29-8P2l2ob67cC7jLbz1iKEZUfJg/edit?usp=sharing)
---
### User Stories
User stories can be found [here](https://www.pivotaltracker.com/n/projects/2021623).


---
### Explanations of the technologies used
- Reset.css - Used this to remove browser styles.
- normalize.css - Used to edit stylings to make them consistent.
- Bootstrap.css - Installed to get common style elements
- Bootstrap.js - Installed primarily to get my modal window looking awesome. I am going to try for modals rather than alerts!
- CSS animation
  - Spin the wheel and letter reveals take advantage of transform and transition.
- jQuery
  - It's a dependency of bootstrap.js
  - It's syntactically easier than vanilla JS
- HTML 5 audio
  - In order to make the game more authentic, I've included a bunch of sound effects. My apologizes if they become annoying.

---

### Approach taken
For branching, I'm going to reference [this document about branching models](http://nvie.com/posts/a-successful-git-branching-model/). The tl;dr - the Master branch is the branch that should always reflect a *production-ready* state. So, not doing the :gh-pages thing.

My overarching theory behind developing this revolved around two concepts: hitting "MVP" (Minimal Viable Product), and "make it work first, make it work well later".

These two idea guided me to getting the functionality working quickly. I prioritized stories accordingly to get it working, and deferred features that didn't get stuff working quickly. It meant some context switching (I went from board display to turn logic back to gameplay), but in the end I had my game.

Then, I went to refine and refactor. Stylings changed, and some complicated verbose logic got separated into functions. When that function broke something, tho, I was able to troubleshoot one issue at a time (okay, Arun helped me get through one big issue.)

**In more detail**
In order to frame the logic, I went through basic user stories first. I wrote these stories in Pivotal Tracker, and organized it first by how a user would interact with the site.
  - When dealing with these stories, my mindset is to break down each item to it's smallest discernible task. That is, a story shouldn't cover multiple elements (unless they're so tied together both need to be delivered at the same time).
  - I then started labeling some stories as "post-mvp", to try and coordinate my time and effort correctly.

Next up was the wireframe! It's super basic, and it's gonna change.

After that, I started building up my framework. I decided to use jQuery and bootstrap. Bootstrap's gonna make my modals work, and I wanna use this as an opportunity to use the framework.

Next is to organize my user stories and start picking them off.

Then, getting stories knocked off one at a time. Getting a puzzle board generated. Then, I went to the turn logic. Then, I added listeners for name input for who's turn it is. Then, I added listeners and updated the board when a letter is input. Then, I went to count the score. Then, I went back to putting limits on the inputs. Then, I went to vowels. Then, I went back to the wheel spin and verified that they only entered consonants. Then, after all the functionally worked, I went back and made ugly verbose code into less ugly functions.

---
### Wireframes
Please check out my original wireframe [here](https://wireframe.cc/WdWGJI). I made this the morning of 2017-05-10, and depending on my css powers, I may change this to something more simple.


---
### How-to-use instructions
To see instructions for the game, please load the game and click "How to Play" on the top right corner

---
### Unsolved problems
- The puzzle board will wrap letters if the board becomes smaller. For long puzzles, this means a weird type of hyphenation happens.
  - A potential solution for this requires a total rewrite of the css and the way letters are generated.
  - A much better solution is to call the wrapping an intended feature, and yelling at any players who say otherwise.
- It doesn't look good on a small scale. I've done some bootstrap magic to have it responsive on a small screen, but the usability suffers on smaller screens.


### Inspirations
- [Hangman game in javascript](https://codepen.io/cathydutton/pen/ldazc)
- [Another simple hangman game](https://jsfiddle.net/phollott/x29ym2ag/)
  - I've used these two on the morning of the first day I was working to get an idea of the logic to build this out. However, as time went on, my code diverged a lot from what they're doing (especially with my homemade turn tracking), and I stopped using them as reference after I got the board setup.
- [Bootstrap modal help]( http://stackoverflow.com/questions/10233550/launch-bootstrap-modal-on-page-load)
- [Podium CodePen](http://codepen.io/davisenra/pen/rLVZJO)
  - I started looking around to see how I can make my html and css look good (not just functional). I really liked the color and font combinations on this, and I went for it.
