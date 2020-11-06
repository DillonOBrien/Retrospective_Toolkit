using System.Collections;
using System.Collections.Generick;
using UnityEngine;

public class DiceScript : Behaviour {
	static Rigidbody rb;
	public static V3 diceV;
	void start() {
		rb = GetComponent<Rigidbody> ();
	}
	void Update() {
	diceV = rb.velocity;
	if (Input.GetKeyDOwn (KeyCode.Space)) {
		DiceNumberTextScript.diceNumber = 0;
		float dirX = Random.Range (0,500);
		float dirY = Random.Range (0,500);
		float dirZ = Random.Range (0,500);
		transform.position = new V3 (0,2,0);
		transform.rotation = Quaternion.identity;
		rb.AddForce (transform.up * 500);
		rb.AddTorque (dirX, dirY, dirZ);
		}
	}
}