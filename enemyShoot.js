AFRAME.registerComponent("enemy-bullets", {
    init: function () {
        setInterval(this.shootEnemyBullet, 2000)
    },
    shootEnemyBullet: function () {
        var enemy_el = document.querySelectorAll(".enemies")
        for(var i=0; i<enemy_el.length; i++){
            var bullet_el = document.createElement("a-entity")
            bullet_el.setAttribute("geometry", {primitive: "sphere", radius: 0.1})
            bullet_el.setAttribute("material", {color: "black"})
            var position = enemy_el[i].getAttribute("position")
            bullet_el.setAttribute("position", {x: position.x+1.5, y: position.y+3.5, z: position.z})
            var scene = document.querySelector("#scene")
            scene.appendChild(bullet_el)

            var enemy = enemy_el[i].object3D
            var player = document.querySelector("#weapon").object3D
            var position1 = new THREE.Vector3()
            var position2 = new THREE.Vector3()
            enemy.getWorldPosition(position2)
            player.getWorldPosition(position1)
            var direction = new THREE.Vector3()
            direction.subVectors(position1, position2).normalize()
            bullet_el.setAttribute("velocity", direction.multiplyScalar(10))
            bullet_el.setAttribute("dynamic-body", {shape: "sphere", mass: 0})
            var life_count = document.querySelector("#countLife")
            var player_life = parseInt(life_count.getAttribute("text").value)

            bullet_el.addEventListener("collide", function(e){
                if(e.detail.body.el.id == "#weapon"){
                    if(player_life > 0){
                        player_life -= 1
                        life_count.setAttribute("text", {value: player_life})
                    }
                    if(player_life <= 0){
                        var overTxt = document.querySelector("#over")
                        overTxt.setAttribute("visible", true)
                        var tank_el = document.querySelector(".enemy")

                        for(var i=0; i<tank_el.length; i++){
                            scene.removeChild(tank_el[i])
                        }
                    }
                    
                }
            })
        }
    },

});