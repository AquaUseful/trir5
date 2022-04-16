import { Color } from "./color.js"
import { CircleRenderable, Renderable } from "./render.js"
import { Vector2D } from "./vector.js"
import { PhysCircle, Portal } from "./phys.js"
import { Circle } from "./shape.js";
import { Engine } from "./engine.js";
import { EdgeCollisionResolver, ElasticCollisionResolver } from "./resolvers.js";
import { randInt } from "./random.js";

function addRandomObject(engine) {
    let fill = new Color(randInt(0, 256), randInt(0, 256), randInt(0, 256), 0.7);
    let stroke = new Color(randInt(0, 256), randInt(0, 256), randInt(0, 256), 1);
    let mass = randInt(1, 5);
    let velocity = new Vector2D(randInt(-3, 4), randInt(-3, 4));
    let accleration = new Vector2D(-0.001, 0.001);
    let radius = randInt(20, 30);
    let pos = new Vector2D(engine.renderElement.clientWidth / 2, engine.renderElement.clientHeight / 2);

    let obj = new PhysCircle(pos, radius, mass, fill, stroke);
    obj.velocity = velocity;
    obj.accleration = accleration;
    engine.addObject(obj);
}

function updateFpsCounter(engine) {
    $("#fps").text(`FPS: ${+engine.fps}`);
}

function checkInput() {
    let reg = /^([1-9][0-9]?|100)$/
    let str = $("#count").val();
    return reg.test(str);
}

function start(engine) {
    if (!checkInput()) {
        alert("Пишите нормальные числа пожалуйста");
        $("#count").val("");
        return;
    }

    $("#start").prop("disabled", true);
    $("#count").prop("disabled", true);

    let objCount = $("#count").val();
    let interval = setInterval(() => {
        addRandomObject(engine);
        if ((--objCount) === 0) {
            clearInterval(interval);
        }
    }, 100);

    setInterval(() => {
        updateFpsCounter(engine);
    }, 1000);

    engine.startEngine();
}

function main() {

    let render = $("#mainRender").get(0);

    let engine = new Engine(render);

    let elasticResolver = new ElasticCollisionResolver();
    let edgeResoler = new EdgeCollisionResolver(new Vector2D(render.clientWidth, render.clientHeight), 0.8);
    engine.addResolver(elasticResolver);
    engine.addResolver(edgeResoler);

    let portalSize = 130
    let portal = new Portal(new Vector2D(0, render.clientHeight - portalSize),
        new Vector2D(render.clientWidth - portalSize, 0),
        portalSize,
        new Color(0, 0, 0, 1),
        new Color(255, 0, 0, 1));
    engine.addPortal(portal);


    $("#start").click(() => {
        start(engine);
    });

}

$(document).ready(main);
