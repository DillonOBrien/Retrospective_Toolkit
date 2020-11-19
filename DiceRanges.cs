using System.Collections;
using System.Collections.Generick;
using UnityEngine;

public class DiceScript : Behaviour {
	static Rigidbody rb;
	public static V3 diceV;
	public static X3 diceX;
	public static Y3 diceY;
	void start() {
		rb = GetComponent<Rigidbody> ();
	}
	void Update() {
	diceV = rb.velocity;
	if (Input.GetKeyDOwn (KeyCode.Space)) {
		DiceNumberTextScript.diceNumber = 0;
		float dirX = Random.Range (0,100);
		float dirY = Random.Range (0,100);
		float dirZ = Random.Range (0,100);
		transform.position = new V3 (0,1,0);
		transform.rotation = Quaternion.identity;
		rb.AddForce (transform.up * 100);
		rb.AddTorque (dirX, dirY, dirZ);
		}
	}
}
