$(document).ready(function () {
    
    // Time function, on hover gives milliseconds since EPOCH (Jan 1, 1970)
    let hover;

    function time() {

        let now = new Date();

        if (!hover) {
            // When not hovering, change text to Local time
            $("#dateTime").text(now.toLocaleString().split(",")[1]);
        }
    }

    // Run it immediately, otherwise waiting 500ms
    time();

    $("#dateTime").on("mouseover", function () {
        // On hover, set hover variable to true
        hover = true;

        // Update time since EPOCH every 7 ms (goes through every number 0-9 for last digit)
        const milliseconds = setInterval(function () {

            // Get current time
            let now = new Date();

            // Update text to new time
            $("#dateTime").text(now.getTime());

            // Cancel millisecond view when no longer hovering
            $("#dateTime").on("mouseout", function () {
                clearInterval(milliseconds);
                hover = false;
                // Instantly get local time
                time();
            });
        }, 7)
    });

    setInterval(function () {
        // Get new time every 500ms
        time()
    }, 500)
})