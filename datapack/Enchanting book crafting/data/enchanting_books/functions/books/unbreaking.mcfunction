#Unbreaking 1 book

execute as @r at @s as @e[type=item,distance=..6,nbt={OnGround:1b,Item:{id:"minecraft:obsidian",Count:8b}}] at @s run tag @s add drop_obsidian
execute as @r at @s as @e[type=item,distance=..6,nbt={OnGround:1b,Item:{id:"minecraft:experience_bottle",Count:2b}}] at @s run tag @s add drop_experience_bottle
execute as @r at @s as @e[type=item,distance=..6,nbt={OnGround:1b,Item:{id:"minecraft:writable_book",Count:1b}}] at @s run tag @s add drop_writable_book

execute as @e[tag=drop_obsidian] at @s if entity @e[tag=drop_experience_bottle,distance=..1] run tag @s add drop_enchanted_book
execute as @e[tag=drop_writable_book] at @s if entity @e[tag=drop_enchanted_book,distance=..1] run tag @s add craft_event

execute as @e[type=item,tag=craft_event] at @s run kill @e[tag=drop_experience_bottle,distance=..1,limit=1]
execute as @e[type=item,tag=craft_event] at @s run kill @e[tag=drop_enchanted_book,distance=..1,limit=1]
execute as @e[type=item,tag=craft_event] at @s run playsound minecraft:entity.experience_orb.pickup master @a
execute as @e[type=item,tag=craft_event] at @s run data merge entity @s {Motion:[0.0,0.3,0.0],Tags:[],Item:{id:"minecraft:enchanted_book",Count:1b,tag:{StoredEnchantments:[{id:"minecraft:unbreaking",lvl:3}]}}}
