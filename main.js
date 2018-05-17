const fps = 60;
const stepTime = 1000.0/fps;
const velocityIterations = 8;
const positionIterations = 3;

let world = null;
let water_particle = null;
let particle_system = null;

function setup() {
    frameRate(30);
    createCanvas(windowWidth, windowHeight);

    var gravity = new b2Vec2(0, 10);
    world = new b2World(gravity);

    var bodyDef = new b2BodyDef();
    var ground = world.CreateBody(bodyDef);

    var chainShape = new b2ChainShape();
    chainShape.vertices.push(new b2Vec2(0, 0));
    chainShape.vertices.push(new b2Vec2(200, 0));
    chainShape.vertices.push(new b2Vec2(200, 200));
    chainShape.vertices.push(new b2Vec2(0, 200));

    chainShape.CreateLoop();
    ground.CreateFixtureFromShape(chainShape, 0);

    var shape = new b2PolygonShape;
    shape.SetAsBoxXYCenterAngle(40, 40, new b2Vec2(50, 50), 0);

    var psd = new b2ParticleSystemDef();
    psd.radius = 1.8;
    psd.dampingStrength = 0.8;

    particleSystem = world.CreateParticleSystem(psd);

    var pd = new b2ParticleGroupDef();
    pd.shape = shape;
    var group = particleSystem.CreateParticleGroup(pd);

    setInterval(() => {
            world.Step(stepTime*0.005, velocityIterations, positionIterations);
        }, stepTime);

    //var particles = particleSystem.GetPositionBuffer();
    //console.log(particles);

    water_particle = loadImage("water_particle.png");
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    clear()
    let particles = particleSystem.GetPositionBuffer();
    for (let i=0; i<particles.length; i+=2) {
        const x = particles[i];
        const y = particles[i+1];
        image(water_particle, x, y);
    }
}
