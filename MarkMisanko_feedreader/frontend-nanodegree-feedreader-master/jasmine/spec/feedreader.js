/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against this application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', () => {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed url
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have URLs', function() {
            allFeeds.forEach(function(feed) {
              expect(feed.url).toBeDefined();
              expect(feed.url.length).not.toBe(0);

            });
        });


        /* This test loops through each feed name
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('have names', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
      });

    /* This is a new test suite named "The menu" */
    describe('The menu', function() {
        /* This test ensures the menu element is
         * hidden by default. WE analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* This test ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('changes visibility when the menu icon is clicked', function() {
            //spyOn

            //Does the menu display when clicked
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).not.toBe(true);

            //Does the menu hide when clicked again
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /* This test suite is named "Initial Entries" */
    describe('Initial Entries', function() {
        /* This test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Because loadFeed() is asynchronous we use Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
              done();
            });
          });

        it('loadFeed function is called and completes its work with at least a single .entry element within the .feed container', function(done) {
          let elementFeed = document.querySelector('.feed').querySelectorAll('.entry');
            expect(elementFeed.length).toBeGreaterThan(0);
            done();
        });
      });


    /* This test suite is named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* This test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * The loadFeed() is asynchronous.
         */

         let container = document.querySelector('.feed');
         let contentBefore = '';
         let contentAfter = '';
         beforeEach(function(done){
            loadFeed(0, function(){
                contentBefore = container.textContent;
                loadFeed(1, function(){
                    contentAfter = container.textContent;
                    done();
                });
            });
         });

         it('new feed is loaded when loadFeed() is called', function(done){

            expect(contentAfter).not.toBe(contentBefore);
            done();
         });
     });
}());
