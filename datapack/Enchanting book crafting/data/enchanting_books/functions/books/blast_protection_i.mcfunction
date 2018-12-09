#Blast protection I book

execute as @r at @s as @e[type=item,distance=..6,nbt={OnGround:1b,Item:{id:"minecraft:gunpowder",Count:16b}}] at @s run tag @s add drop_gunpowder
execute as @r at @s as @e[type=item,distance=..6,nbt={OnGround:1b,Item:{id:"minecraft:lapis_lazuli",Count:4b}}] at @s run tag @s add drop_lapis_lazuli
execute as @r at @s as @e[type=item,distance=..6,nbt={OnGround:1b,Item:{id:"minecraft:writable_book",Count:1b}}] at @s run tag @s add drop_writable_book

execute as @e[tag=[$ingredient_1_output_name]] at @s if entity @e[tag=[$ingredient_2_output_name],distance=..1] run tag @s add drop_enchanted_book
execute as @e[tag=drop_writable_book] at @s if entity @e[tag=drop_enchanted_book,distance=..1] run tag @s add craft_event

execute as @e[type=item,tag=craft_event] at @s run kill @e[tag=[$ingredient_2_output_name],distance=..1,limit=1]
execute as @e[type=item,tag=craft_event] at @s run kill @e[tag=drop_enchanted_book,distance=..1,limit=1]
execute as @e[type=item,tag=craft_event] at @s run playsound minecraft:entity.experience_orb.pickup master @a
execute as @e[type=item,tag=craft_event] at @s run data merge entity @s {Motion:[0.0,0.3,0.0],Tags:[],Item:{id:"minecraft:enchanted_book",Count:1b,tag:{StoredEnchantments:[{id:"minecraft:blast_protection",lvl:1}]}}}
