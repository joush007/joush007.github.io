$(document).ready(function () {
    // Time Thingy, on hover you get milliseconds, because why not
    let hover = false;

    function time() {
        let now = new Date();

        if (!hover) {
            $("#dateTime").text(now.toLocaleString().split(",")[1]);
        }
    }

    time();

    $("#dateTime").on("mouseover", function () {
        hover = true;

        const milliseconds = setInterval(function () {
            let now = new Date();

            $("#dateTime").text(now.getTime());

            $("#dateTime").on("mouseout", function () {
                clearInterval(milliseconds);
                hover = false;
                time();
            });
        }, 7)
    });

    setInterval(function () {
        time()
    }, 500)
})