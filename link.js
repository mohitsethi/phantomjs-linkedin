var page = new WebPage(),
    testindex = 0,
    loadInProgress = false;

page.onConsoleMessage = function(msg) {
    console.log(msg);
};

page.onLoadStarted = function() {
    loadInProgress = true;
    //console.log("load started");
};

page.onLoadFinished = function() {
    loadInProgress = false;
    //console.log("load finished");
};

var steps = [
    function() {
        //Load Login Page
        page.open("https://www.linkedin.com/");
    },
    function() {
        //Enter Credentials
        page.evaluate(function() {

            document.getElementById("session_key-login").value = "martinpagotto@";
            document.getElementById("session_password-login").value = "";

            console.log("user/pass setted ... ");
        });
    },
    function() {
        //Login
        page.evaluate(function() {
            console.log("logging in ... ");
            var form = document.getElementById("login");
            form.submit();
        });
    },
    function() {
        page.evaluate(function() {
            console.log("logged in ... " + document.querySelectorAll('title')[0].outerHTML);
            console.log("Opening jobs page");
        });
        page.open("https://www.linkedin.com/vsearch/j?keywords=java&countryCode=ar&orig=JSHP&distance=50&locationType=I&openFacets=L,C,N&sortBy=DD");
    },
  	function() {
        //list jobs
        console.log("listing jobs ... ");
        page.evaluate(function() {
            console.log(document.querySelectorAll('title')[0].outerHTML);
            var results = Array.prototype.slice.call(document.getElementById("results").getElementsByTagName("h3"));
            for (i = 0; i < results.length; i++) {
                console.log(results[i].getElementsByTagName('a')[0].innerHTML);
            }
        });
    }
];

interval = setInterval(function() {
    if (!loadInProgress && typeof steps[testindex] == "function") {
        //console.log("step " + (testindex + 1));
        steps[testindex]();
        testindex++;
    }
    if (typeof steps[testindex] != "function") {
        console.log("test complete!");
        phantom.exit();
    }
}, 10000);