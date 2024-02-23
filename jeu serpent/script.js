window.onload = function()
{
    var canvaswidth = 900;
    var canvasheight = 600;
    var blockSize = 30;
    var ctx;
    var delay = 1000;
    var snakee;

    init();

    function init()
    {
        var canvas = document.createElement('canvas');
        canvas.width = canvaswidth;
        canvas.height = canvasheight;
        canvas.style.border = "1px solid";
        document.body.appendChild(canvas);
        ctx = canvas.getContext('2d');
        snakee = new snake([[6,4],[5,4],[4,4]],"right");
        refreshcanvas();


    }

    function refreshcanvas()
    {
        
        ctx.clearRect(0,0,canvaswidth,canvasheight);
        snakee.advance();
        snakee.draw(); 
        setTimeout(refreshcanvas,delay);

         
    }

    function drawBlock(ctx,position)
    {
        var x = position[0] * blockSize;
        var y = position[1] * blockSize;
        ctx.fillRect(x,y,blockSize,blockSize);


    }

    function snake(body, direction)
    {
        this.body = body;
        this.direction = direction;
        this.draw = function()
            {
                ctx.save();
                ctx.fillStyle = "#ff0000";
                for(var i = 0; i < this.body.length;i++)
                {
                    drawBlock(ctx, this.body[i]);
                }
                ctx.restore();

            };
        this.advance = function()
        {
            var nextposition = this.body[0].slice();
            switch(this.direction)
            {
                case "left":
                    nextposition[0] -=1;
                    break;
                case "right":
                    nextposition[0] +=1;
                    break;
                case "down":
                    nextposition[1] +=1;
                    break;
                case "up":
                    nextposition[1] -=1;
                    break;
                default:
                    throw("invalid direction");

            }
            this.body.unshift(nextposition);
            this.body.pop();
        } ;
        this.setDirection = function(newDirection)
        {
            var allowedDirection;
            switch(this.direction)
            {
                case "left":
                case "right":
                    allowedDirection = [ "up", "down"];
                    break;
                case "down":
                case "up":
                    allowedDirection = ["left","rignt"];
                    break;
                default:
                    throw("invalid direction");

            }
            if(allowedDirection.indexOf(newDirection) > -1)
            {
                this.direction = newDirection;
            }


        };
        

    }

}

document.onkeydown = function handlekeyDown(a)
{
    var newDirection;
    var key = a.keyCode;
    switch(key)
    {
        case 37:
            newDirection = "left";
            break;
        case 38:
            newDirection = "up";
            break;
        case 39:
            newDirection = "right";
            break;
        case 40:
            newDirection = "down";
            break;
        default:
            return;
            

    };
    snakee.setDirection(newDirection);
};