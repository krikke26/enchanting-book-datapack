#[$book_name] book

execute as @r at @s as @e[type=item,distance=..6,nbt={OnGround:1b,Item:{id:"[$ingredient_1_name]",Count:[$ingredient_1_count]b}}] at @s run tag @s add [$ingredient_1_output_name]_[$enchant_id]_[$stored_enchantments_lvl]
execute as @r at @s as @e[type=item,distance=..6,nbt={OnGround:1b,Item:{id:"[$ingredient_2_name]",Count:[$ingredient_2_count]b}}] at @s run tag @s add [$ingredient_2_output_name]_[$enchant_id]_[$stored_enchantments_lvl]
execute as @r at @s as @e[type=item,distance=..6,nbt={OnGround:1b,Item:{id:"minecraft:writable_book",Count:1b}}] at @s run tag @s add drop_writable_book_[$enchant_id]_[$stored_enchantments_lvl]

execute as @e[tag=[$ingredient_1_output_name]_[$enchant_id]_[$stored_enchantments_lvl]] at @s if entity @e[tag=[$ingredient_2_output_name]_[$enchant_id]_[$stored_enchantments_lvl],distance=..1] run tag @s add drop_enchanted_book_[$enchant_id]_[$stored_enchantments_lvl]
execute as @e[tag=drop_writable_book_[$enchant_id]_[$stored_enchantments_lvl]] at @s if entity @e[tag=drop_enchanted_book_[$enchant_id]_[$stored_enchantments_lvl],distance=..1] run tag @s add craft_event_[$enchant_id]_[$stored_enchantments_lvl]

execute as @e[type=item,tag=craft_event_[$enchant_id]_[$stored_enchantments_lvl]] at @s run kill @e[tag=[$ingredient_2_output_name]_[$enchant_id]_[$stored_enchantments_lvl],distance=..1,limit=1]
execute as @e[type=item,tag=craft_event_[$enchant_id]_[$stored_enchantments_lvl]] at @s run kill @e[tag=drop_enchanted_book_[$enchant_id]_[$stored_enchantments_lvl],distance=..1,limit=1]
execute as @e[type=item,tag=craft_event_[$enchant_id]_[$stored_enchantments_lvl]] at @s run playsound minecraft:entity.experience_orb.pickup master @a
execute as @e[type=item,tag=craft_event_[$enchant_id]_[$stored_enchantments_lvl]] at @s run data merge entity @s {Motion:[0.0,0.3,0.0],Tags:[],Item:{id:"minecraft:enchanted_book",Count:1b,tag:{StoredEnchantments:[{id:"[$stored_enchantments_id]",lvl:[$stored_enchantments_lvl]}]}}}
