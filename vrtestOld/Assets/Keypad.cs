using UnityEngine;
using System.Collections;

public class Keypad : MonoBehaviour {

	public string curPassword;
	public string input;
	public bool onTrigger;
	public bool keypadScreen;
	private Challenge puzzle;
	public char trigger;

	public void SetChallenge(Challenge puzzle) {
		this.puzzle = puzzle;
	}

	void OnTriggerEnter(Collider other)
	{
		onTrigger = true;
	}

	void OnTriggerExit(Collider other)
	{
		onTrigger = false;
		keypadScreen = false;
		input = "";
	}

	void Update()
	{
		if(input == curPassword)
		{
			puzzle.Completed ();
		}
	}

	void OnGUI()
	{
		if(!puzzle.completed)
		{
			if(onTrigger)
			{
				foreach (char c in Input.inputString) {
					if (c == trigger) {
						keypadScreen = true;
						print ("toggling trigger");
					}
				}
			}

			if(keypadScreen)
			{
				GUI.Box(new Rect(0, 0, 320, 455), "");
				GUI.Box(new Rect(5, 5, 310, 25), input);

				if(GUI.Button(new Rect(5, 35, 100, 100), "1"))
				{
					input = input + "1";
				}

				if(GUI.Button(new Rect(110, 35, 100, 100), "2"))
				{
					input = input + "2";
				}

				if(GUI.Button(new Rect(215, 35, 100, 100), "3"))
				{
					input = input + "3";
				}

				if(GUI.Button(new Rect(5, 140, 100, 100), "4"))
				{
					input = input + "4";
				}

				if(GUI.Button(new Rect(110, 140, 100, 100), "5"))
				{
					input = input + "5";
				}

				if(GUI.Button(new Rect(215, 140, 100, 100), "6"))
				{
					input = input + "6";
				}

				if(GUI.Button(new Rect(5, 245, 100, 100), "7"))
				{
					input = input + "7";
				}

				if(GUI.Button(new Rect(110, 245, 100, 100), "8"))
				{
					input = input + "8";
				}

				if(GUI.Button(new Rect(215, 245, 100, 100), "9"))
				{
					input = input + "9";
				}

				if(GUI.Button(new Rect(110, 350, 100, 100), "0"))
				{
					input = input + "0";
				}
				if (GUI.Button (new Rect (215, 350, 100, 100), "Clear")) {
					input = "";
				}
				if (GUI.Button (new Rect (5, 350, 100, 100), "Collapse")) {
					keypadScreen = false;
				}
			}
		}
	}
}