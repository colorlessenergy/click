kaboom({
    background: [51, 51, 51]
});

loadSound('pop', 'pop.mp3');

const score = add([
    text('0', {
        size: 36,
        width: width() - 16,
        font: 'apl386'
    }),
    pos(16, 16),
    { value: 0 }
]);

const colors = [
    color(234, 53, 70),
    color(249, 200, 14),
    color(72, 229, 194),
    color(128, 138, 159)
];

const createCircle = () => {
    const randomRadius = rand(20, 40);
    let randomXSpeed = rand(100, 200);
    if (Math.random() > 0.5) {
        randomXSpeed *= -1;
    }

    let randomYSpeed = rand(100, 200);
    if (Math.random() > 0.5) {
        randomYSpeed *= -1;
    }
    add([
        pos(
            rand(randomRadius * 2, width() - randomRadius * 2),
            rand(randomRadius * 2, height() - randomRadius * 2)
        ),
        circle(randomRadius),
        area({ height: randomRadius * 2, width: randomRadius * 2 }),
        origin('center'),
        choose(colors),
        'ball',
        {
            xSpeed: randomXSpeed,
            YSpeed: randomYSpeed
        }
    ]);
};

for (let i = 0; i < 10; i++) {
    createCircle();
}

onClick('ball', c => {
    play('pop');

    c.destroy();

    createCircle();

    score.value += 1;
    score.text = score.value;
});

onTouchStart((id, pos) => {
    every('ball', c => {
        if (c.hasPoint(pos)) {
            play('pop');

            c.destroy();

            createCircle();

            score.value += 1;
            score.text = score.value;
        }
    });
});

onUpdate('ball', c => {
    if (c.worldArea().p1.x < 0 || c.worldArea().p2.x > width()) {
        c.xSpeed = -c.xSpeed;
    }

    if (c.worldArea().p1.y < 0 || c.worldArea().p2.y > height()) {
        c.YSpeed = -c.YSpeed;
    }

    c.move(c.xSpeed, c.YSpeed);
});
