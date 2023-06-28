import React, { useEffect, useState } from "react";
import {
  Flex,
  Icon,
  Text,
  FlexProps,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Box,
  useColorModeValue,
  FormControl,
  FormErrorMessage,
  Tooltip
} from "@chakra-ui/react";
import { ptBR } from 'date-fns/locale';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format, parseISO } from "date-fns";

type DatePickerProps = FlexProps & {
  children?: string | JSX.Element;
  dateSelected?: Date;
  variant?: 'default' | 'icon-button' | 'birthdate';
  disableDates?: Date[];
  error?: string;
  onSelectDate(value: Date): void;
}

export function DatePicker({
  dateSelected,
  onSelectDate,
  ...rest
}: DatePickerProps) {
  const bgDayPicker = useColorModeValue('white', 'gray-dark');
  const textDayPicker = useColorModeValue('black', 'white');
  const bgDayPickerDropdown = useColorModeValue('inherit', '#161F26');
  const [disabled, setDisabled] = useState<boolean>(false);

  function handleOnDayClick(day: Date) {
    onSelectDate(day);
  }

  return (
    <>
      <Popover>
        {({ onClose }) => (
          <Flex w="full" justify="center">
            <PopoverTrigger>
              <FormControl
                display="flex"
                flexDir="column"
              >
                <Flex
                  w="full"
                  h="3.0rem"
                  align="center"
                  rounded="md"
                  px={6}
                  bg={bgDayPicker}
                  borderWidth={1}
                  cursor="pointer"

                  {...rest}
                >
                  <Text userSelect="none" color={!!dateSelected ? 'inherit' : 'gray.400'}>{(!!dateSelected) ? format(dateSelected!, 'dd/MM/yyyy') : 'Selecione a data'}</Text>
                </Flex>
              </FormControl>

            </PopoverTrigger>
            <PopoverContent
              color={textDayPicker}
              bg={bgDayPicker}
            >
              <DayPicker
                mode="default"
                fromYear={1900}
                toYear={new Date().getFullYear()}
                captionLayout="dropdown"
                styles={{
                  caption: {
                    borderBottomWidth: 1,
                    borderBottomColor: '#4E4E4E'
                  },
                  dropdown: {
                    backgroundColor: bgDayPickerDropdown
                  }
                }}
                selected={dateSelected}
                onDayClick={day => {
                  handleOnDayClick(day)
                  onClose()
                }}

                locale={ptBR}
              />
            </PopoverContent>
          </Flex>
        )}
      </Popover >
    </>
  )
}
