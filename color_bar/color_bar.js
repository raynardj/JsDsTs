const create_base_css = async () =>{
    var style = document.createElement("style")
    $(style).html(
        `.color_pixel_block
        {
            height:5px;
            width:10px;
        }
        `
    )
    $("body").append(style)
}

const color_pixel = (color) =>{
    var dom = document.createElement("div");
    dom.className="color_pixel_block"
    dom.color = color
    assign_pixel(dom)
    return dom
}

const assign_pixel = (dom)=>{
    $(dom).css({"background-color":dom.color,display:"inline-block"})
}
var get_color_string=(pos)=>{
    var arr = [];
    for(var i=pos;i<60;i++){
        arr.push(i)
    }
    for(var i=60;i>60-pos;i--){
        arr.push(i)
    }
    return arr
}

const digit_to_hex = (i) =>{
    var ans = parseInt(i).toString(16)
    if(ans.length>=2){return ans}
    return `0${ans}`
}
var colors_to_hex=(r,g,b)=>{
    return `#${digit_to_hex(r)}${digit_to_hex(g)}${digit_to_hex(b)}`
}
const create_color_bar = async(dom) =>{
    create_base_css()
    const base1 = get_color_string(0);
    const base2 = get_color_string(30);
    const base3 = get_color_string(60);
    const operate_colors = (operation) =>{
        var row = document.createElement("div")
        for(var i=0;i<120;i++){
            var hex_color = colors_to_hex(operation(base1[i]),operation(base2[i]),operation(base3[i]));
            var pixel = color_pixel(hex_color)
            $(row).append(pixel)
        }
        return row
    }

    
    var rows = document.createElement("div")
    for(var i=0; i<33; i++){
        var color_scale=i*8
        $(rows).append(operate_colors(x=>Math.min(color_scale,x*255/60)))
    }
    for(var i=0; i<33; i++){
        var color_scale=i*8
        $(rows).append(operate_colors(x=>Math.max(color_scale,x*255/60)))
    }
    console.log(rows)
    $(dom).append(rows)
}