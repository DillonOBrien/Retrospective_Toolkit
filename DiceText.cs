using System.Collections;
using Systems.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
public class DiceText : Behaviour {
	Text text;
	public static int DiceN;
	void Start () {
		Text = getComponent<Text> ();
	}
	void Update() {
		Text.text = diceNumber.ToString();
	}
}