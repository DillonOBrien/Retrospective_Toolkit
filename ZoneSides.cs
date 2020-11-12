using System.Collections;
using UnityEngine;
using System.Collections.Generic;
using UnityEngine.UI;
 
public class ZoneDice : MonoBehaviour {
    private Sprite[] diceSides;
    private SpriteRenderer rend;
    private void Start () {
        rend = GetComponent<SpriteRenderer>();
        diceSides = Resources.LoadAll<Sprite>("ZoneSides/");
    }
    private void OnMouseDown()
    {
        StartCoroutine("DiceRoll");
    }
    public IEnumerator DiceRoll()
    {
        int randomDiceSide = 6;
        int finalSide = 0;
        for (int i = 0; i <= 20; i++)
        {
            randomDiceSide = Random.Range(0, 6);
            rend.sprite = Sides[randomSide];
            yield return new WaitForSeconds(0.05f);
        }
        Side = randomDiceSide + 1;
        if (Side == 1)
        {
            Debug.Log(Side);
        }
        if (Side == 2)
        {
            Debug.Log(Side);
        }
        if (Side == 3)
        {
            Debug.Log(Side);
        }
        if (Side == 4)
        {
            Debug.Log(Side);
        }
        if (Side == 5)
        {
            Debug.Log(Side);
        }
        if (Side == 6)
        {
            Debug.Log(Side);
        }
    }
}