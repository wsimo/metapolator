function createCanvas() {
    var canvas = $('<canvas width="940" height="300"></canvas>');
    $('#glyphs').append(
        $('<div class="wrapper"></div>').append(canvas))

    return canvas[0].getContext('2d');
}

function getFontInstance(fontinstance) {

    return {
        font: fontinstance,
        text: 'Natalia',
        fontSize: 72,
        interpolationValue: 0.2,

        interpolate: function(instance) {
            $('#glyphs').html('');
            var pathA = this.getPath(),
                pathB = instance.getPath(),
                ctx = createCanvas();

            for (var i = 0; i < pathA.commands.length; i++) {
                var B_command = pathB.commands[i] || pathA.commands[i];
                if (pathA.commands[i].x) {
                    pathA.commands[i].x = this.interpolateValue(pathA.commands[i].x, B_command.x);
                }
                if (pathA.commands[i].x1) {
                    pathA.commands[i].x1 = this.interpolateValue(pathA.commands[i].x1, B_command.x1);
                }
                if (pathA.commands[i].y1) {
                    pathA.commands[i].y1 = this.interpolateValue(pathA.commands[i].x1, B_command.y1);
                }
                if (pathA.commands[i].y) {
                    pathA.commands[i].y = this.interpolateValue(pathA.commands[i].y, B_command.y);
                }
            }

            pathA.draw(ctx);
        },

        interpolateValue: function(A, B) {
            return parseInt(A + this.interpolationValue * ( B - A ));
        },

        getPath: function() {
            return this.font.getPath(this.text, 50, 120, this.fontSize);
        }
    }
}

var instances = [];


function funStart() {
    instances[0].interpolate(instances[1]);
}
