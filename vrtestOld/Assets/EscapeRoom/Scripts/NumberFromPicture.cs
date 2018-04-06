using UnityEngine;
using System.Collections;

public class NumberFromPicture : Challenge
{
	public Keypad keypad;
	// Use this for initialization
	public override void Start ()
	{
		keypad.SetChallenge (this);
	}
}

