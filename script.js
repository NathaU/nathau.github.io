$(document).ready(function(){
	var itemcount = 0;
	var enchcount = [];
	$("#add-item").click(function(){
		var id = itemcount++;
		enchcount.push(0);
		$("#have").append(`<div class="have" item="`+id+`">
			Item Type: <select id="sel-item-`+id+`">
				<option value="0">Enchanted Book</option>
				<option value="1">Sword</option>
				<option value="2">Bow</option>
				<option value="3">Pickaxe</option>
				<option value="5">Shovel</option>
				<option value="6">Axe</option>
				<option value="7">Helmet</option>
				<option value="8">Chestplate</option>
				<option value="9">Pants</option>
				<option value="10">Boots</option>
			</select>
			Previous uses: <input type="number" min="0" value="0" id="uses-`+id+`" />
			<button class="add-ench">Add Enchantment</button> <button class="delete">X</button>
			<section></section>
		</div>`);
	});
	$("#have").on("click", "button.delete", function(){ $(this).parent().remove(); });
	$("#have").on("click", "button.add-ench", function(){
		var itemid = $(this).parent().attr("item");
		var id = enchcount[itemid]++;
		var content = '<div class="ench" ench="'+id+'">Enchantment: <select id="sel-ench-'+itemid+'-'+id+'">';
		for(let k in ench_obj){
			content += '<option value="'+k+'">'+ench_obj[k].name+'</option>';
		}
		content += '</select> Level: <input type="number" min="1" value="1" id="level-'+itemid+'-'+id+'"/> <button class="del-ench">X</button><br></div>';
		$(this).siblings("section").append(content);
	});
	$("#have").on("click", "button.del-ench", function(){ $(this).parent().remove(); });
	/*$("#add-ench-wanted").click(function(){
		var id = $(".ench-wanted").length;
		var content = '<div class="ench-wanted ench-wanted-'+id+'">Enchantment: <select id="sel-ench-wanted-'+id+'">';
		enchantments.forEach(function(e){
			content = content + '<option value="'+e[0]+'">'+e[1]+'</option>';
		});
		content = content + '</select> Level: <input type="number" min="1" value="1" id="level-wanted-'+id+'"/><br></div>';
		$("#ench-wanted").append(content);
	});*/
	$("#calc").click(function(){
		var data = [];
		
		$(".have").each(function(){
			var ench = [];
			var i = $(this).attr("item");
			$(this).children("section").children(".ench").each(function(){
				var j = $(this).attr("ench");
				ench.push({"id": parseInt($("#sel-ench-"+i+"-"+j).children("option:selected").val()), "level": parseInt($("#level-"+i+"-"+j).val())});
			});
			data.push({
				"type": $("#sel-item-"+i).children("option:selected").val() == 0 ? "book" : "tool",
				"prev": parseInt($("#uses-"+i).val()),
				"enchantments": ench
			});
		});
		
		calculate(data);
		return;
	});
});
//wenigste Kosten
//wenigste Prev.Kosten
//- Anzahl ntuzungen anzeigen

function de(arr){
	var o = "";
	arr.forEach(function(e){
		o += ", " + ench_obj[e.id].name + " " + e.level;
	});
	return o.slice(2);
}
function enchantment_value(item_data, logging){
	var val = 0;
	var log = "Value of " + de(item_data.enchantments) + ": ";
	item_data.enchantments.forEach(function(e){
		val += (e.level * (item_data.type == "book" ? ench_obj[e.id].multiplier_book : ench_obj[e.id].multiplier_tool));
		log += e.level + " * " + (item_data.type == "book" ? ench_obj[e.id].multiplier_book : ench_obj[e.id].multiplier_tool) + " + ";
	});
	if(logging) console.log(log.slice(0, -3));
	return val;
}

function calculate(item_data){
	/*var item_data = [
		{
			"type": "boots",
			"prev": 0,
			"enchantments": [],
		},
		{
			"type": "book",
			"prev": 0,
			"enchantments": [{"id": 0, "level": 4}],
		},
		{
			"type": "book",
			"prev": 0,
			"enchantments": [{"id": 17, "level": 3}],
		},
		{
			"type": "book",
			"prev": 0,
			"enchantments": [{"id": 36, "level": 3}],
		},
		{
			"type": "book",
			"prev": 0,
			"enchantments": [{"id": 26, "level": 1}],
		},
		{
			"type": "book",
			"prev": 0,
			"enchantments": [{"id": 7, "level": 3}],
		},
		{
			"type": "book",
			"prev": 0,
			"enchantments": [{"id": 5, "level": 3}],
		},
		{
			"type": "book",
			"prev": 0,
			"enchantments": [{"id": 2, "level": 4}],
		},
	];*/
	
	if(item_data.length < 2){
		alert("Select at least 2 items!");
		return;
	}
	
	var generated_permutations = [];
	var elements_to_permute = [];
	for(let i = 0; i < item_data.length; i++){
		elements_to_permute.push(i);
	}
	function permute(cur, arr){
		if(arr.length > 0){
			for(let i = 0; i < arr.length; i++){
				var next = cur.concat([arr[i]]);
				var rem = arr.slice(0);
				rem.splice(i, 1);
				permute(next, rem);
			}
		}else{
			generated_permutations.push(cur);
		}
	};
	permute([], elements_to_permute);
	
	var best_pairwise_index = 0;
	var best_pairwise_cost = 1000000;
	var pairwise_result = [];
	
	//generated_permutations = [[0, 3, 6, 7, 5, 1, 2, 4]];
	for(let i = 0; i < generated_permutations.length; i++){ //each combination
		var c = [];
		generated_permutations[i].forEach(function(e){
			c.push($.extend(true, {}, item_data[e]));
		});
		
		//Mode 1: pairwise
		var cost = 0;
		console.log("==================================================");
		function pairwise(/*c*/){
			console.log("--------------------------------------------------");
			if(c.length == 1){
				//add cost to result
				if(cost < best_pairwise_cost){
					best_pairwise_cost = cost;
					best_pairwise_index = i;
					pairwise_result = c[0];
				}
				return true;
			}else{
				//var next_combi = [];
				for(let j = Math.floor(c.length/2) - 1; j >= 0; j--){ //number of pairs
					var index = j*2;
					console.log("Combine " + c[index].type + " (" + de(c[index].enchantments) + ") with " + c[index+1].type + " (" + de(c[index+1].enchantments) + ")");
					
					//check for invalidity
					if(c[index].type == "book" && c[index+1].type != "book"){
						console.log("Invalid action, continue with next combination");
						return false;
					}
					
					var val = 0;
				
					c[index+1].enchantments.forEach(function(e1){
						console.log("-- Found " + ench_obj[e1.id].name + " " + e1.level + " on sacrifice")
						let level_on_target = e1.level;
						c[index].enchantments.forEach(function(e0){
							if(e1.id == e0.id){
								if(e1.level == e0.level){
									//level_on_target = Math.max(level_on_target + 1, ench_obj[e1.id].max_level);
									e0.level = Math.min(e1.level + 1, ench_obj[e1.id].max_level);
									val += (e0.level * (c[index+1].type == "book" ? ench_obj[e1.id].multiplier_book : ench_obj[e1.id].multiplier_tool));
									console.log("\tBoth have the same level, raise to level " + e0.level);
									//cost = cost + (level_on_target * (c[index+1].type == "book" ? ench_obj[e1.id].multiplier_book : ench_obj[e1.id].multiplier_tool));
								}else if(e1.level > e0.level){
									e0.level = e1.level;
									console.log("\tRaise to sacrifice level " + e1.level);
									val += (e0.level * (c[index+1].type == "book" ? ench_obj[e1.id].multiplier_book : ench_obj[e1.id].multiplier_tool));
									//cost = cost + (level_on_target * (c[index+1].type == "book" ? ench_obj[e1.id].multiplier_book : ench_obj[e1.id].multiplier_tool));
								}else if(e1.level < e0.level){
									//level_on_target = e0.level;
									//cost = cost + (level_on_target * (c[index+1].type == "book" ? ench_obj[e1.id].multiplier_book : ench_obj[e1.id].multiplier_tool));
									console.log("\tLevel is smaller, do nothing");
									val += (e0.level * (c[index+1].type == "book" ? ench_obj[e1.id].multiplier_book : ench_obj[e1.id].multiplier_tool));
								}
								level_on_target = 0;
							}else if(ench_obj[e1.id].incompatible !== undefined && ench_obj[e1.id].incompatible == ench_obj[e0.id].incompatible){
								cost += 1;
								level_on_target = 0;
								console.log("\tCost + 1 due to incompatibility with " + ench_obj[e0.id]);
							}
						});
						if(level_on_target > 0){
							console.log("\tAdd to target");
							c[index].enchantments.push(e1);
							val += (e1.level * (c[index+1].type == "book" ? ench_obj[e1.id].multiplier_book : ench_obj[e1.id].multiplier_tool));
						}
					});
					
					console.log("Result: " + c[index].type + " (" + de(c[index].enchantments) + ")");
					console.log("Cost " + (Math.pow(2, c[index].prev) - 1) + " + " + val + " + " + (Math.pow(2, c[index+1].prev) - 1) + " (Penalty and enchantment value)");
					
					cost += val + Math.pow(2, c[index].prev) + Math.pow(2, c[index+1].prev) - 2; //value of sacrifice + pwp of target and sacrifice
					
					c[index].prev = Math.max(c[index].prev, c[index+1].prev) + 1;
					
					c.splice(index+1, 1);
				}
				pairwise();
			}
		}
		pairwise();
	}
	
	var content = "";
	generated_permutations[best_pairwise_index].forEach(function(e){
		content = content + "<td><b>";
		content = content + item_data[e].type + "</b>";
		item_data[e].enchantments.forEach(function(e){
			content += "<br>" + ench_obj[e.id].name + " " + e.level;
		});
		content += "</td>";
	});
	$("#restbl tr").html(content);
	
	$("#cost").html(best_pairwise_cost);
	
	content = "<b>" + pairwise_result.type + "</b> (used " + pairwise_result.prev + "x)";
	pairwise_result.enchantments.forEach(function(e){
		content += "<br>" + ench_obj[e.id].name + " " + e.level;
	});
	
	$("#res").html(content);
	
	console.log(pairwise_result);
}