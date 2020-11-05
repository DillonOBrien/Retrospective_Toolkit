using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DiceNumber : Behaviour {

	Vector3 diceVelocity

	void FixedUpdate () {
		diceVelocity = DiceScript.diceVelocity;
	}

void OnTriggerStay(Collier col)
{
	if (diceV.x == 0f && diceV.y == 0f && diceV.z == 0f)
	{
		switch (col.gameObject.name) {
		case "Side1":
			DiceNumberDisplay.diceNumber = 1;
			break;
		case "Side2":
			DiceNumberDisplay.diceNumber = 2;
			break;
		case "Side3":
			DiceNumberDisplay.diceNumber = 3;
			break;
		case "Side4":
			DiceNumberDisplay.diceNumber = 4;
			break;
		case "Side5":
			DiceNumberDisplay.diceNumber = 5;
			break;
		case "Side6":
			DiceNumberDisplay.diceNumber = 6;
			break;
		}
	}
}
}
